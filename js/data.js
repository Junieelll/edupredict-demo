window.EP = window.EP || {};

EP.data = {
  currentUser: {
    name: 'Juniel Cardenas',
    email: 'juniel.cardenas@edu.ph',
    avatar: 'JC',
    studentId: '2021-00142',
    program: 'BS Computer Science',
    year: '3rd Year',
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
      id: 1, name: 'Introduction to Computer Science', code: 'CS101',
      room: 'Room 201', instructor: 'Prof. Abdul Jakol Salsalani',
      students: 28, schedule: 'MWF 8:00–9:00 AM', color: 'indigo',
      semester: '2nd Semester, AY 2025-2026',
      description: 'Fundamentals of computing, problem-solving, and basic programming concepts.',
      avgScore: 83, submissions: 6, nextClass: 'Wed, Apr 2',
    },
    {
      id: 2, name: 'Data Structures & Algorithms', code: 'CS201',
      room: 'Room 305', instructor: 'Prof. Elena Vasquez',
      students: 24, schedule: 'TTh 1:00–2:30 PM', color: 'violet',
      semester: '2nd Semester, AY 2025-2026',
      description: 'Linear and non-linear data structures, algorithm design, and complexity analysis.',
      avgScore: 79, submissions: 5, nextClass: 'Thu, Apr 3',
    },
    {
      id: 3, name: 'Web Development Fundamentals', code: 'CS150',
      room: 'Lab 402', instructor: 'Prof. Ramon Cruz',
      students: 30, schedule: 'MWF 10:00–11:00 AM', color: 'sky',
      semester: '2nd Semester, AY 2025-2026',
      description: 'HTML, CSS, JavaScript, and modern frontend frameworks for web development.',
      avgScore: 77, submissions: 7, nextClass: 'Wed, Apr 2',
    },
  ],

  classworks: [
    { id:1, classId:1, title:'Problem Set 3: Recursion',           type:'Assignment', dueDate:'2026-04-05', status:'Pending',   maxScore:100, score:null, submissions:18, total:28 },
    { id:2, classId:2, title:'Lab Exercise 5: Binary Trees',       type:'Laboratory', dueDate:'2026-04-03', status:'Submitted', maxScore:50,  score:45,   submissions:20, total:24 },
    { id:3, classId:3, title:'Project 2: Responsive Portfolio',    type:'Project',    dueDate:'2026-04-10', status:'Pending',   maxScore:100, score:null, submissions:12, total:30 },
    { id:4, classId:1, title:'Quiz 4: Sorting Algorithms',         type:'Quiz',       dueDate:'2026-03-28', status:'Graded',    maxScore:30,  score:27,   submissions:26, total:28 },
    { id:5, classId:2, title:'Homework 3: Graph Traversal',        type:'Assignment', dueDate:'2026-03-25', status:'Graded',    maxScore:50,  score:42,   submissions:22, total:24 },
    { id:6, classId:3, title:'Exercise 4: JavaScript DOM',         type:'Laboratory', dueDate:'2026-03-30', status:'Overdue',   maxScore:30,  score:null, submissions:25, total:30 },
    { id:7, classId:1, title:'Midterm Examination',                type:'Exam',       dueDate:'2026-03-20', status:'Graded',    maxScore:100, score:88,   submissions:28, total:28 },
    { id:8, classId:3, title:'Quiz 3: CSS Flexbox & Grid',         type:'Quiz',       dueDate:'2026-04-08', status:'Pending',   maxScore:25,  score:null, submissions:8,  total:30 },
    { id:9, classId:2, title:'Midterm Project: AVL Tree Visualizer',type:'Project',   dueDate:'2026-04-15', status:'Pending',   maxScore:100, score:null, submissions:5,  total:24 },
  ],

  recommendations: [
    {
      id:1, subject:'Data Structures & Algorithms',
      reason:'Based on your recent score in binary tree exercises',
      items:[
        { title:'Visualizing Binary Search Trees',    type:'Video',    source:'MIT OpenCourseWare', duration:'45 min',      difficulty:'Intermediate' },
        { title:'Introduction to Graph Theory',       type:'Article',  source:'GeeksforGeeks',      duration:'20 min read', difficulty:'Beginner' },
        { title:'Dynamic Programming Practice Set',   type:'Practice', source:'LeetCode',           duration:'2 hrs',       difficulty:'Advanced' },
      ]
    },
    {
      id:2, subject:'Web Development Fundamentals',
      reason:'Strengthen your JavaScript fundamentals',
      items:[
        { title:'JavaScript Event Loop Explained',    type:'Video',    source:'freeCodeCamp',       duration:'30 min',      difficulty:'Intermediate' },
        { title:'Modern CSS Layout Techniques',       type:'Article',  source:'CSS-Tricks',         duration:'15 min read', difficulty:'Beginner' },
        { title:'Build a REST API with Node.js',      type:'Practice', source:'The Odin Project',   duration:'3 hrs',       difficulty:'Intermediate' },
      ]
    },
    {
      id:3, subject:'Introduction to Computer Science',
      reason:'Recommended to strengthen recursion concepts',
      items:[
        { title:'Recursion and Backtracking Deep Dive', type:'Video',  source:'CS50 Harvard',       duration:'55 min',      difficulty:'Intermediate' },
        { title:'Big-O Notation Cheat Sheet',         type:'Article',  source:'Big-O Cheatsheet',   duration:'10 min read', difficulty:'Beginner' },
      ]
    },
  ],

  predictions: {
    student: {
      overall: 84, trend: 'improving',
      subjects: [
        { name:'CS101', label:'Intro to CS',   current:88, predicted:90, risk:'Low'    },
        { name:'CS201', label:'Data Structures',current:82, predicted:85, risk:'Low'   },
        { name:'CS150', label:'Web Dev',       current:76, predicted:80, risk:'Medium' },
      ],
      history: [75,78,80,82,84,86,88],
      futureLabels: ['Apr','May'],
      future: [90,92],
      labels: ['Sep','Oct','Nov','Dec','Jan','Feb','Mar'],
    },
    classAverage: {
      CS101: { scores:[78,80,79,82,81,83,83], labels:['Sep','Oct','Nov','Dec','Jan','Feb','Mar'] },
      CS201: { scores:[72,74,73,76,75,77,79], labels:['Sep','Oct','Nov','Dec','Jan','Feb','Mar'] },
      CS150: { scores:[70,73,71,74,76,75,77], labels:['Sep','Oct','Nov','Dec','Jan','Feb','Mar'] },
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
};