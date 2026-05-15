import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

const sfiaSkills = [
  { code: 'ANALY', name: 'Analytics', category: 'Information & Data', description: 'Developing insights from data using automated tools.' },
  { code: 'APPM', name: 'Application Management', category: 'Software & Systems', description: 'Managing the lifecycle of applications.' },
  { code: 'BUSA', name: 'Business Analysis', category: 'Strategy', description: 'Analysing business needs and requirements.' },
  { code: 'ARCH', name: 'Architecture', category: 'Technology', description: 'Designing enterprise architecture.' },
  { code: 'CLDO', name: 'Cloud Computing', category: 'Technology', description: 'Designing and managing cloud solutions.' },
  { code: 'COBT', name: 'Consulting', category: 'Strategy', description: 'Providing expert advice to organisations.' },
  { code: 'CYBS', name: 'Cybersecurity', category: 'Security', description: 'Protecting organisational assets.' },
  { code: 'DATM', name: 'Data Management', category: 'Information & Data', description: 'Managing organisational data assets.' },
  { code: 'DATS', name: 'Data Science', category: 'Information & Data', description: 'Extracting insights from data.' },
  { code: 'DEVO', name: 'DevOps', category: 'Software & Systems', description: 'Combining development and operations.' },
  { code: 'EMBE', name: 'Embedded Systems', category: 'Software & Systems', description: 'Developing real-time systems.' },
  { code: 'ENTW', name: 'Enterprise Software', category: 'Software & Systems', description: 'Implementing enterprise applications.' },
  { code: 'HCI', name: 'Human-Computer Interaction', category: 'Design', description: 'Designing user interfaces.' },
  { code: 'IFDN', name: 'Infrastructure Design', category: 'Technology', description: 'Designing technology infrastructure.' },
  { code: 'ITOP', name: 'Infrastructure Operations', category: 'Technology', description: 'Operating technology infrastructure.' },
  { code: 'KADM', name: 'Knowledge Management', category: 'Information & Data', description: 'Managing organisational knowledge.' },
  { code: 'LGMT', name: 'Digital Transformation', category: 'Strategy', description: 'Leading digital transformation.' },
  { code: 'MGT', name: 'Management', category: 'Strategy', description: 'Managing people and resources.' },
  { code: 'MKTG', name: 'Marketing', category: 'Business', description: 'Marketing products and services.' },
  { code: 'NRTL', name: 'Network Support', category: 'Technology', description: 'Supporting network infrastructure.' },
  { code: 'NETS', name: 'Network Engineering', category: 'Technology', description: 'Designing networks.' },
  { code: 'PCSI', name: 'Procurement', category: 'Business', description: 'Acquiring goods and services.' },
  { code: 'PMGR', name: 'Product Management', category: 'Strategy', description: 'Managing product lifecycle.' },
  { code: 'PROG', name: 'Programming', category: 'Software & Systems', description: 'Developing software code.' },
  { code: 'PRMG', name: 'Project Management', category: 'Strategy', description: 'Managing project delivery.' },
  { code: 'QUAS', name: 'Quality Assurance', category: 'Quality', description: 'Assuring quality outcomes.' },
  { code: 'QUMG', name: 'Quality Management', category: 'Quality', description: 'Managing quality processes.' },
  { code: 'RESD', name: 'Real-time Systems', category: 'Software & Systems', description: 'Developing real-time software.' },
  { code: 'REQM', name: 'Requirements Definition', category: 'Strategy', description: 'Defining business requirements.' },
  { code: 'SFAS', name: 'Safety Assessment', category: 'Safety', description: 'Assessing safety systems.' },
  { code: 'SFEN', name: 'Safety Engineering', category: 'Safety', description: 'Engineering safety solutions.' },
  { code: 'SCAD', name: 'Security Operations', category: 'Security', description: 'Operating security measures.' },
  { code: 'SCTY', name: 'Information Security', category: 'Security', description: 'Operating security controls.' },
  { code: 'ISCO', name: 'Systems Coordination', category: 'Technology', description: 'Coordinating systems strategies.' },
  { code: 'SYSW', name: 'Systems Development', category: 'Software & Systems', description: 'Developing information systems.' },
  { code: 'TEST', name: 'Testing', category: 'Quality', description: 'Testing software systems.' },
  { code: 'TEMP', name: 'Technical Documentation', category: 'Communication', description: 'Creating technical docs.' },
  { code: 'TENG', name: 'Technical Engineering', category: 'Technology', description: 'Engineering technical solutions.' },
  { code: 'TISM', name: 'Technical Management', category: 'Technology', description: 'Managing technical functions.' },
  { code: 'TRNG', name: 'Training', category: 'Human Resources', description: 'Delivering training.' },
  { code: 'URNA', name: 'User Research', category: 'Design', description: 'Researching user needs.' },
  { code: 'WEB', name: 'Web Development', category: 'Software & Systems', description: 'Developing web applications.' },
  { code: 'WPLN', name: 'Workplace Planning', category: 'Strategy', description: 'Planning workplace requirements.' },
];

// POST - Seed SFIA skills
export async function POST() {
  try {
    await query(`DEFINE TABLE IF NOT EXISTS skill SCHEMAFULL`);
    await query(`DEFINE FIELD IF NOT EXISTS code ON TABLE skill TYPE string`);
    await query(`DEFINE FIELD IF NOT EXISTS name ON TABLE skill TYPE string`);
    await query(`DEFINE FIELD IF NOT EXISTS category ON TABLE skill TYPE string`);
    await query(`DEFINE FIELD IF NOT EXISTS description ON TABLE skill TYPE string`);
    
    let seeded = 0;
    for (const skill of sfiaSkills) {
      try {
        await query(`UPSERT skill:${skill.code} SET code = $code, name = $name, category = $category, description = $description`, skill);
        seeded++;
      } catch {}
    }
    
    return NextResponse.json({ success: true, count: seeded });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to seed' }, { status: 500 });
  }
}

// GET - List SFIA skills
export async function GET() {
  return NextResponse.json({ 
    message: 'POST to seed',
    skills: sfiaSkills.map(s => ({ code: s.code, name: s.name, category: s.category }))
  });
}
