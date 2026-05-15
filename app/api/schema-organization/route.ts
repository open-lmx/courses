import { NextResponse } from 'next/server';
import Surreal from 'surrealdb';

async function getDb() {
  const db = new Surreal();
  const url = process.env.SURREAL_URL || 'https://demo.surrealdb.com';
  const user = process.env.SURREAL_USER || 'root';
  const pass = process.env.SURREAL_PASS || 'root';
  const ns = process.env.SURREAL_NS || 'test';
  const dbName = process.env.SURREAL_DB || 'test';
  
  await db.connect(url, { namespace: ns, database: dbName });
  await db.signin({ username: user, password: pass });
  return db;
}

// GET /api/schema-organization - Get organization as schema.org Organization
export async function GET() {
  try {
    const db = await getDb();
    
    const orgs = await db.query<any[]>(
      'SELECT * FROM organization LIMIT 1'
    );
    
    await db.close();
    
    if (!orgs[0]?.length) {
      // Return default organization
      return NextResponse.json({
        '@context': 'https://schema.org',
        '@type': 'Organization',
        '@id': 'https://openlmx.com',
        name: 'OpenAutonomyx (OPCI) Private Limited',
        description: 'AI education company specializing in autonomous agent systems and LLM development.',
        url: 'https://openlmx.com',
        logo: 'https://openlmx.com/logo.png',
        sameAs: [
          'https://github.com/open-lmx'
        ],
        contactPoint: {
          '@type': 'ContactPoint',
          email: 'contact@openlmx.com',
          contactType: 'customer service'
        },
        address: {
          '@type': 'PostalAddress',
          addressCountry: 'IN'
        },
        areaServed: 'Worldwide',
        serviceType: 'Online Education'
      });
    }
    
    const organizations = orgs[0].map((o: any) => ({
      '@context': 'https://schema.org',
      '@type': 'Organization',
      '@id': o.id,
      name: o.name,
      description: o.description,
      url: o.url,
      logo: o.logo,
      image: o.image,
      sameAs: o.sameAs,
      foundingDate: o.foundingDate,
      address: o.address,
      contactPoint: o.contactPoint,
      founder: o.founder,
      employee: o.employee,
      memberOf: o.memberOf,
      areaServed: o.areaServed,
      serviceType: o.serviceType,
    }));
    
    return NextResponse.json({ '@context': 'https://schema.org', '@graph': organizations });
  } catch (error) {
    console.error('Schema Org error:', error);
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
  }
}
