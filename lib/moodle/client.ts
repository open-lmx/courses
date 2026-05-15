import { getDb } from '@/lib/db';

const MOODLE_URL = process.env.MOODLE_URL;
const MOODLE_TOKEN = process.env.MOODLE_TOKEN;

// Moodle REST API client
class MoodleClient {
  private baseUrl: string;
  private token: string;

  constructor() {
    this.baseUrl = MOODLE_URL || '';
    this.token = MOODLE_TOKEN || '';
  }

  private async request<T>(wsfunction: string, params: Record<string, any> = {}): Promise<T> {
    const formData = new URLSearchParams();
    formData.append('wstoken', this.token);
    formData.append('wsfunction', wsfunction);
    formData.append('moodlewsrestformat', 'json');
    
    for (const [key, value] of Object.entries(params)) {
      formData.append(key, String(value));
    }

    const response = await fetch(`${this.baseUrl}/webservice/rest/server.php`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: formData.toString(),
    });

    const data = await response.json();
    if (data.exception) {
      throw new Error(data.message);
    }
    return data;
  }

  // User operations
  async createUser(user: { username: string; email: string; firstname: string; lastname: string; password?: string }) {
    return this.request('core_user_create_users', {
      users: [user],
    });
  }

  async updateUser(id: number, user: Partial<{ username: string; email: string; firstname: string; lastname: string }>) {
    return this.request('core_user_update_users', {
      users: [{ id, ...user }],
    });
  }

  async getUsersByField(field: string, value: string) {
    return this.request('core_user_get_users_by_field', {
      field,
      'values[0]': value,
    });
  }

  // Course operations
  async createCourse(course: { fullname: string; shortname: string; categoryid: number; summary?: string }) {
    return this.request('core_course_create_courses', {
      courses: [course],
    });
  }

  async updateCourse(id: number, course: Partial<{ fullname: string; shortname: string; summary: string }>) {
    return this.request('core_course_update_courses', {
      courses: [{ id, ...course }],
    });
  }

  async getCoursesByField(field: string, value: string) {
    return this.request('core_course_get_courses_by_field', {
      field,
      value,
    });
  }

  async getCourseSections(courseid: number) {
    return this.request('core_course_get_contents', { courseid });
  }

  // Enrollment
  async enrollUser(courseid: number, userid: number, roleid: number = 5) {
    return this.request('enrol_manual_enrol_users', {
      enrolments: [{ roleid, userid, courseid }],
    });
  }

  async unenrollUser(courseid: number, userid: number) {
    return this.request('enrol_manual_unenrol_users', {
      enrolments: [{ userid, courseid }],
    });
  }

  // Get categories
  async getCategories(parentid: number = 0) {
    return this.request('core_course_get_categories', { parentid });
  }

  async createCategory(category: { name: string; parentid?: number; description?: string }) {
    return this.request('core_course_create_categories', { categories: [category] });
  }
}

// Sync: SurrealDB <-> Moodle
export async function syncUserToMoodle(surrealUserId: string) {
  const db = await getDb();
  const users = await db.query<any[]>('SELECT * FROM user WHERE id = $id', { id: surrealUserId });
  
  if (!users[0]?.length) return null;
  const user = users[0][0];

  const moodle = new MoodleClient();
  
  // Check if user exists in Moodle
  const existing = await moodle.getUsersByField('email', user.email);
  
  if (existing && existing.length > 0) {
    // Update
    await moodle.updateUser(existing[0].id, {
      firstname: user.name,
      lastname: user.lastname || '',
    });
    return existing[0].id;
  } else {
    // Create
    const result: any = await moodle.createUser({
      username: user.email.split('@')[0],
      email: user.email,
      firstname: user.name,
      lastname: user.lastname || '',
      password: user.password?.substring(0, 8) || 'ChangeMe123!',
    });
    return result[0]?.id;
  }
}

export async function syncCourseToMoodle(courseId: string) {
  const db = await getDb();
  const courses = await db.query<any[]>('SELECT * FROM course WHERE id = $id', { id: courseId });
  
  if (!courses[0]?.length) return null;
  const course = courses[0][0];

  const moodle = new MoodleClient();
  
  // Check if course exists
  const existing: any = await moodle.getCoursesByField('shortname', course.title);
  
  if (existing && existing.length > 0) {
    await moodle.updateCourse(existing[0].id, {
      fullname: course.title,
      summary: course.description,
    });
    return existing[0].id;
  } else {
    // Create in category 1 (default)
    const result: any = await moodle.createCourse({
      fullname: course.title,
      shortname: course.title,
      categoryid: 1,
      summary: course.description,
    });
    return result[0]?.id;
  }
}

export { MoodleClient };
