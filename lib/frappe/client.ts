// Frappe LMS API client
const FRAPPE_URL = process.env.FRAPPE_URL;
const FRAPPE_KEY = process.env.FRAPPE_KEY;
const FRAPPE_SECRET = process.env.FRAPPE_SECRET;

class FrappeClient {
  private baseUrl: string;
  private key: string;
  private secret: string;

  constructor() {
    this.baseUrl = FRAPPE_URL || '';
    this.key = FRAPPE_KEY || '';
    this.secret = FRAPPE_SECRET || '';
  }

  private async request<T>(endpoint: string, method = 'GET', body?: any): Promise<T> {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    // Frappe uses API key/secret for auth
    if (this.key && this.secret) {
      const auth = Buffer.from(`${this.key}:${this.secret}`).toString('base64');
      headers['Authorization'] = `Basic ${auth}`;
    }

    const response = await fetch(`${this.baseUrl}/api/resource/${endpoint}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });

    return response.json();
  }

  // Course operations (Frappe: "LMS Course")
  async getCourses() {
    return this.request('LMS Course');
  }

  async getCourse(name: string) {
    return this.request(`LMS Course/${name}`);
  }

  async createCourse(course: { title: string; description: string; course_code: string; is_published?: boolean }) {
    return this.request('LMS Course', 'POST', course);
  }

  async updateCourse(name: string, course: Partial<{ title: string; description: string; is_published: boolean }>) {
    return this.request(`LMS Course/${name}`, 'PUT', course);
  }

  // Chapter operations (Frappe: "LMS Chapter")
  async getChapters(course: string) {
    return this.request(`LMS Chapter?fields=["*"]&filters=[["course","=","${course}"]]`);
  }

  async createChapter(chapter: { title: string; course: string; chapter_id: number }) {
    return this.request('LMS Chapter', 'POST', chapter);
  }

  // Lesson operations (Frappe: "LMS Lesson")
  async getLessons(chapter: string) {
    return this.request(`LMS Lesson?fields=["*"]&filters=[["chapter","=","${chapter}"]]`);
  }

  async createLesson(lesson: { title: string; chapter: string; content_type: string; content: string }) {
    return this.request('LMS Lesson', 'POST', lesson);
  }

  // Enrollment (Frappe: "LMS Enrollment")
  async enrollUser(course: string, user: string) {
    return this.request('LMS Enrollment', 'POST', { course, user });
  }

  async getEnrollments(user: string) {
    return this.request(`LMS Enrollment?filters=[["user","=","${user}"]]`);
  }

  // Quiz operations (Frappe: "LMS Quiz")
  async getQuizzes(course: string) {
    return this.request(`LMS Quiz?filters=[["course","=","${course}"]]`);
  }

  async submitQuiz(quiz: string, user: string, answers: any) {
    return this.request('LMS Quiz Submission', 'POST', { quiz, user, answers });
  }
}

// Sync from SurrealDB to Frappe
export async function syncToFrappe(courseId: string) {
  // Implementation depends on Frappe setup
}

export { FrappeClient };

// Frappe HR Job Opening integration
export class FrappeHRClient extends FrappeClient {
  async getJobOpenings(filters?: { status?: string; department?: string }) {
    const query = 'Job Opening?fields=["*"]';
    if (filters?.status) {
      return this.request(`${query}&filters=[["status","=","${filters.status}"]]`);
    }
    return this.request(query);
  }

  async createJobOpening(job: { 
    job_title: string; 
    department: string; 
    description: string; 
    vacancy: number;
    status?: string;
    posting_date?: string;
    closure_date?: string;
  }) {
    return this.request('Job Opening', 'POST', job);
  }

  async getJobApplications(job: string) {
    return this.request(`Job Applicant?fields=["*"]&filters=[["job_title","=","${job}"]]`);
  }

  async createJobApplication(app: { 
    job_title: string; 
    applicant_name: string; 
    email_id: string; 
    phone: string;
    resume?: string;
  }) {
    return this.request('Job Applicant', 'POST', app);
  }

  async getDepartments() {
    return this.request('Department?fields=["*"]');
  }
}
