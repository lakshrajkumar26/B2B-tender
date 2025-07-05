const mongoose = require('mongoose');
const Tender = require('./models/tender');
const Company = require('./models/company');
require('dotenv').config();

const dummyTenders = [
  {
    title: "Website Development for E-commerce Platform",
    description: "We need a modern, responsive e-commerce website with payment integration, inventory management, and admin dashboard.",
    deadline: new Date('2024-03-15'),
    budget: 25000,
    createdBy: null
  },
  {
    title: "Mobile App Development for Food Delivery",
    description: "Develop a cross-platform mobile app for food delivery service with real-time tracking, payment gateway, and user management.",
    deadline: new Date('2024-03-20'),
    budget: 35000,
    createdBy: null
  },
  {
    title: "Cloud Infrastructure Migration",
    description: "Migrate our existing on-premise infrastructure to AWS cloud with high availability, security, and cost optimization.",
    deadline: new Date('2024-03-25'),
    budget: 45000,
    createdBy: null
  },
  {
    title: "Digital Marketing Campaign",
    description: "Comprehensive digital marketing campaign including SEO, social media marketing, PPC, and content creation for our new product launch.",
    deadline: new Date('2024-03-30'),
    budget: 15000,
    createdBy: null
  },
  {
    title: "HR Management System",
    description: "Custom HR management system with employee portal, attendance tracking, payroll management, and performance evaluation modules.",
    deadline: new Date('2024-04-05'),
    budget: 30000,
    createdBy: null
  },
  {
    title: "Cybersecurity Audit and Implementation",
    description: "Comprehensive security audit of our IT infrastructure and implementation of security measures including firewall, encryption, and access controls.",
    deadline: new Date('2024-04-10'),
    budget: 40000,
    createdBy: null
  },
  {
    title: "Data Analytics Dashboard",
    description: "Build a real-time analytics dashboard with data visualization, reporting tools, and KPI tracking for business intelligence.",
    deadline: new Date('2024-04-15'),
    budget: 28000,
    createdBy: null
  },
  {
    title: "Customer Support Chat System",
    description: "Implement an AI-powered customer support chat system with ticket management, knowledge base, and multi-language support.",
    deadline: new Date('2024-04-20'),
    budget: 22000,
    createdBy: null
  },
  {
    title: "Inventory Management Software",
    description: "Develop inventory management software with barcode scanning, stock alerts, supplier management, and reporting features.",
    deadline: new Date('2024-04-25'),
    budget: 32000,
    createdBy: null
  },
  {
    title: "Financial Accounting System",
    description: "Custom accounting software with general ledger, accounts payable/receivable, financial reporting, and tax calculation modules.",
    deadline: new Date('2024-05-01'),
    budget: 38000,
    createdBy: null
  },
  {
    title: "E-learning Platform Development",
    description: "Build an online learning platform with course management, video streaming, assessments, certificates, and progress tracking.",
    deadline: new Date('2024-05-05'),
    budget: 42000,
    createdBy: null
  },
  {
    title: "Supply Chain Management System",
    description: "End-to-end supply chain management system with order tracking, warehouse management, logistics optimization, and supplier portal.",
    deadline: new Date('2024-05-10'),
    budget: 50000,
    createdBy: null
  },
  {
    title: "Real Estate Management Platform",
    description: "Property management platform with listing management, virtual tours, tenant portal, maintenance tracking, and financial reporting.",
    deadline: new Date('2024-05-15'),
    budget: 35000,
    createdBy: null
  },
  {
    title: "Healthcare Management System",
    description: "Hospital management system with patient records, appointment scheduling, billing, pharmacy management, and medical inventory.",
    deadline: new Date('2024-05-20'),
    budget: 55000,
    createdBy: null
  },
  {
    title: "Restaurant POS System",
    description: "Point of sale system for restaurants with menu management, order tracking, payment processing, and inventory integration.",
    deadline: new Date('2024-05-25'),
    budget: 18000,
    createdBy: null
  },
  {
    title: "Fleet Management Software",
    description: "Vehicle fleet management system with GPS tracking, maintenance scheduling, fuel monitoring, driver management, and route optimization.",
    deadline: new Date('2024-06-01'),
    budget: 33000,
    createdBy: null
  },
  {
    title: "Event Management Platform",
    description: "Event planning and management platform with ticketing, registration, venue management, vendor coordination, and analytics.",
    deadline: new Date('2024-06-05'),
    budget: 27000,
    createdBy: null
  },
  {
    title: "CRM System Development",
    description: "Customer relationship management system with lead tracking, sales pipeline, customer communication, and performance analytics.",
    deadline: new Date('2024-06-10'),
    budget: 31000,
    createdBy: null
  },
  {
    title: "IoT Dashboard for Smart Buildings",
    description: "IoT monitoring dashboard for smart buildings with sensor data visualization, energy management, security monitoring, and predictive maintenance.",
    deadline: new Date('2024-06-15'),
    budget: 48000,
    createdBy: null
  },
  {
    title: "Blockchain-based Supply Chain Tracking",
    description: "Implement blockchain technology for transparent supply chain tracking with smart contracts, product authentication, and audit trails.",
    deadline: new Date('2024-06-20'),
    budget: 65000,
    createdBy: null
  }
];

async function seedTenders() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/b2btender');
    console.log('Connected to MongoDB');

    // Get a company to use as createdBy (or create one if none exists)
    let company = await Company.findOne();
    if (!company) {
      console.log('No company found. Creating a dummy company...');
      company = await Company.create({
        userId: new mongoose.Types.ObjectId(), // Dummy user ID
        name: "Sample Company",
        industry: "IT",
        description: "A sample company for testing",
        services: "Software Development"
      });
    }

    // Update all tenders with the company ID
    const tendersWithCompany = dummyTenders.map(tender => ({
      ...tender,
      createdBy: company._id
    }));

    // Clear existing tenders and insert new ones
    await Tender.deleteMany({});
    const result = await Tender.insertMany(tendersWithCompany);
    
    console.log(`Successfully added ${result.length} dummy tenders to the database`);
    console.log('Sample tenders created:');
    result.forEach((tender, index) => {
      console.log(`${index + 1}. ${tender.title} - Budget: $${tender.budget}`);
    });

  } catch (error) {
    console.error('Error seeding tenders:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

seedTenders(); 