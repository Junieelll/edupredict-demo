window.EP = window.EP || {};

EP.data = {
  currentUser: {
    name: 'Juniel Cardenas',
    email: 'juniel.cardenas@edu.ph',
    avatar: 'JC',
    studentId: '2021-00142',
    program: 'BS Information Technology',
    year: '4th Year',
    phone: '+63 917 234 5678',
  },

  students: [
    { id: 1, name: 'Maria Santos',     email: 'maria.santos@edu.ph',     gpa: 3.8, attendance: 95, dropoutRisk: 'Low',    scores: [88,92,85,90,94,92], predicted: 93 },
    { id: 2, name: 'Juan dela Cruz',   email: 'juan.delacruz@edu.ph',    gpa: 2.1, attendance: 68, dropoutRisk: 'High',   scores: [65,58,72,60,55,58], predicted: 56 },
    { id: 3, name: 'Ana Reyes',        email: 'ana.reyes@edu.ph',        gpa: 3.0, attendance: 82, dropoutRisk: 'Low',    scores: [78,80,75,82,79,81], predicted: 82 },
    { id: 4, name: 'Carlos Mendoza',   email: 'carlos.mendoza@edu.ph',   gpa: 2.7, attendance: 75, dropoutRisk: 'Medium', scores: [70,72,75,78,80,81], predicted: 82 },
    { id: 5, name: 'Sofia Lim',        email: 'sofia.lim@edu.ph',        gpa: 3.9, attendance: 97, dropoutRisk: 'Low',    scores: [92,95,89,96,94,95], predicted: 96 },
    { id: 6, name: 'Miguel Gonzales',  email: 'miguel.gonzales@edu.ph',  gpa: 1.9, attendance: 62, dropoutRisk: 'High',   scores: [55,60,48,62,58,54], predicted: 52 },
    { id: 7, name: 'Isabella Cruz',    email: 'isabella.cruz@edu.ph',    gpa: 3.2, attendance: 85, dropoutRisk: 'Low',    scores: [82,80,85,83,86,85], predicted: 86 },
    { id: 8, name: 'Ramon Aquino',     email: 'ramon.aquino@edu.ph',     gpa: 3.6, attendance: 90, dropoutRisk: 'Low',    scores: [87,85,90,88,91,90], predicted: 92 },
    { id: 9, name: 'Daniela Bautista', email: 'daniela.bautista@edu.ph', gpa: 2.5, attendance: 78, dropoutRisk: 'Medium', scores: [72,68,74,70,73,74], predicted: 74 },
    { id:10, name: 'Kevin Tan',        email: 'kevin.tan@edu.ph',        gpa: 2.8, attendance: 80, dropoutRisk: 'Medium', scores: [74,78,76,80,82,83], predicted: 84 },
  ],

  classes: [
    {
      id: 1, name: 'Practicum 2', code: 'PRC102',
      room: 'IL504a', instructor: 'Prof. Samuel Rivera',
      students: 28, schedule: 'Fri 2:30PM-5:30PM', color: 'indigo',
      semester: '2nd Semester, AY 2025-2026',
      description: 'Practical training and professional experience in the information technology industry.',
      avgScore: 88, submissions: 6, nextClass: 'Fri, Apr 4',
    },
    {
      id: 2, name: 'Capstone Project & Research 2', code: 'CAP102',
      room: 'IL504a', instructor: 'Prof. Elena Vasquez',
      students: 24, schedule: 'Fri 6:00PM-9:00PM', color: 'violet',
      semester: '2nd Semester, AY 2025-2026',
      description: 'The final phase of the research project, focusing on implementation, testing, and final documentation.',
      avgScore: 82, submissions: 5, nextClass: 'Fri, Apr 4',
    },
    {
      id: 3, name: 'Systems Admin & Maintenance', code: 'SAM101',
      room: 'IL603a / IK504 F2', instructor: 'Prof. Ramon Cruz',
      students: 30, schedule: 'Sat 3:00PM-5:00PM & 6:00PM-9:00PM', color: 'sky',
      semester: '2nd Semester, AY 2025-2026',
      description: 'Setup, configuration, and maintenance of server systems and networking infrastructure.',
      avgScore: 76, submissions: 7, nextClass: 'Sat, Apr 5',
    },
  ],

  classworks: [
    { id:1, classId:1, title:'Weekly Practicum Journal 4',         type:'Assignment', dueDate:'2026-04-06', status:'Pending',   maxScore:100, score:null, submissions:18, total:28 },
    { id:2, classId:2, title:'Midterm Prototype V1',               type:'Laboratory', dueDate:'2026-04-03', status:'Submitted', maxScore:50,  score:45,   submissions:20, total:24 },
    { id:3, classId:3, title:'Linux Server Config Lab',            type:'Project',    dueDate:'2026-04-10', status:'Pending',   maxScore:100, score:null, submissions:12, total:30 },
    { id:4, classId:1, title:'Company Feedback Report',            type:'Quiz',       dueDate:'2026-03-28', status:'Graded',    maxScore:30,  score:27,   submissions:26, total:28 },
    { id:5, classId:2, title:'Technical Documentation Draft',       type:'Assignment', dueDate:'2026-03-25', status:'Graded',    maxScore:50,  score:42,   submissions:22, total:24 },
    { id:6, classId:3, title:'Web Server Hosting setup',           type:'Laboratory', dueDate:'2026-03-30', status:'Overdue',   maxScore:30,  score:null, submissions:25, total:30 },
    { id:7, classId:1, title:'Midterm Internship Review',          type:'Exam',       dueDate:'2026-03-20', status:'Graded',    maxScore:100, score:88,   submissions:28, total:28 },
    { id:8, classId:3, title:'Configuration Quiz 1',               type:'Quiz',       dueDate:'2026-04-08', status:'Pending',   maxScore:25,  score:null, submissions:8,  total:30 },
    { id:9, classId:2, title:'Final Implementation Plan',          type:'Project',    dueDate:'2026-04-15', status:'Pending',   maxScore:100, score:null, submissions:5,  total:24 },
  ],

  recommendations: [
    {
      id:1, subject:'Systems Admin & Maintenance',
      reason:'Strengthen your server configuration skills',
      items:[
        { title:'Advanced Linux Command Line',        type:'Video',    source:'A Cloud Guru',       duration:'45 min',      difficulty:'Intermediate' },
        { title:'Networking Fundamentals for Admin',  type:'Article',  source:'Cisco Networking',   duration:'20 min read', difficulty:'Beginner' },
        { title:'Docker Containerization Guide',      type:'Practice', source:'Docker Docs',        duration:'2 hrs',       difficulty:'Advanced' },
      ]
    },
    {
      id:2, subject:'Capstone Project & Research 2',
      reason:'Improve your methodology documentation',
      items:[
        { title:'Structuring Technical Documentation',type:'Video',    source:'Google Developers',  duration:'30 min',      difficulty:'Intermediate' },
        { title:'User Testing Strategies for Apps',   type:'Article',  source:'Nielsen Norman',     duration:'15 min read', difficulty:'Beginner' },
        { title:'Design Doc Templates',               type:'Practice', source:'Product Hunt',       duration:'3 hrs',       difficulty:'Intermediate' },
      ]
    },
    {
      id:3, subject:'Practicum 2',
      reason:'Enhance your professional reflections',
      items:[
        { title:'Professional Communication at Work', type:'Video',    source:'LinkedIn Learning',  duration:'55 min',      difficulty:'Intermediate' },
        { title:'Self-Reflection in Internships',     type:'Article',  source:'HBR',                duration:'10 min read', difficulty:'Beginner' },
      ]
    },
  ],

  predictions: {
    student: {
      overall: 84, trend: 'improving',
      subjects: [
        { name:'PRC102', label:'Practicum 2',      current:92, predicted:94, risk:'Low'    },
        { name:'CAP102', label:'Capstone 2',       current:85, predicted:88, risk:'Low'    },
        { name:'SAM101', label:'Systems Admin',    current:76, predicted:80, risk:'Medium' },
      ],
      history: [75,78,80,82,84,86,88],
      futureLabels: ['Apr', 'May'],
      future: [90,92],
      labels: ['Sep','Oct','Nov','Dec','Jan','Feb','Mar'],
    },
    classAverage: {
      PRC102: { scores:[78,80,79,82,81,83,83], labels:['Sep','Oct','Nov','Dec','Jan','Feb','Mar'] },
      CAP102: { scores:[72,74,73,76,75,77,79], labels:['Sep','Oct','Nov','Dec','Jan','Feb','Mar'] },
      SAM101: { scores:[70,73,71,74,76,75,77], labels:['Sep','Oct','Nov','Dec','Jan','Feb','Mar'] },
    },
    riskDist: { Low:6, Medium:2, High:2 },
    modelAccuracy: 91.4,
  },

  chatMessages: [
    { role:'assistant', text:"Hi Juniel! 👋 I'm your AI study assistant. I can help you understand concepts, review for exams, and suggest study strategies. What would you like to learn today?" },
    { role:'user',      text:"Can you explain what a binary search tree is?" },
    { role:'assistant', text:"Great question! A **Binary Search Tree (BST)** is a data structure where each node has at most two children:\n\n• **Left child** — always smaller than the parent\n• **Right child** — always larger than the parent\n\nThis makes search very efficient: O(log n) average case, since you eliminate half the tree at each step.\n\nExample: inserting 5, 3, 7, 1, 4 gives:\n\n    5\n   / \\\n  3   7\n / \\\n1   4\n\nWant me to walk through insertion or deletion?" },
    { role:'user',      text:"Yes, how do you delete a node with two children?" },
    { role:'assistant', text:"Deletion with two children uses the **in-order successor** approach:\n\n1. Find the **in-order successor** — the smallest node in the right subtree\n2. Copy its value into the node being deleted\n3. Delete the in-order successor (which has at most one child)\n\nThis preserves the BST property. For example, deleting node 5 from the tree above:\n— In-order successor of 5 is 7\n— Replace 5's value with 7\n— Delete the original 7 node\n\nTime complexity: O(h) where h is the height of the tree. Need help with the code implementation?" },
  ],

  chatResponses: [
    "That's a great point! Let me elaborate on that concept for you...",
    "Based on your current coursework, I'd recommend reviewing the lecture slides from last week. The key idea here is to break the problem into smaller subproblems.",
    "Excellent question! This topic often comes up in exams. The core principle is: always verify your base case in recursive solutions.",
    "I see where you're coming from. In Computer Science, this is a classic trade-off between time and space complexity.",
    "Here's a helpful tip: when working on algorithm problems, try drawing it out first. Visual representation often makes the pattern clear.",
  ],

  announcements: [
    { id: 1, classId: 1, date: '2026-03-25', title: 'Midterm Exam Schedule', text: 'The midterm exam will be held on April 5th at Room 201. Please bring your own laptop and ensure you have a stable internet connection.' },
    { id: 2, classId: 1, date: '2026-03-30', title: 'New Resource Posted', text: 'I have uploaded the latest lecture slides on Recursion. You can find them in the recommendations section under CS101.' },
  ],
  notifications: [
    { id: 1, title: 'New Grade Posted', time: '2026-04-02T09:00:00Z', text: 'Prof. Samuel Rivera graded Weekly Practicum Journal 4.', icon: 'document-check', color: 'indigo', isRead: false },
    { id: 2, title: 'Attendance Risk Alert', time: '2026-04-02T08:30:00Z', text: 'Your attendance in Systems Admin dropped below 80%.', icon: 'exclamation-triangle', color: 'amber', isRead: false },
    { id: 3, title: 'AI Prediction Update', time: '2026-04-01T15:00:00Z', text: 'Your predicted GPA increased to 3.52!', icon: 'sparkles', color: 'violet', isRead: true },
    { id: 4, title: 'System Maintenance', time: '2026-03-30T10:00:00Z', text: 'EduPredict will be down for maintenance this Sunday at 2AM.', icon: 'cog-6-tooth', color: 'slate', isRead: true },
    { id: 5, title: 'Class Reminder', time: '2026-03-30T07:00:00Z', text: 'Practicum 2 meeting in 1 hour.', icon: 'clock', color: 'sky', isRead: true },
  ]
};