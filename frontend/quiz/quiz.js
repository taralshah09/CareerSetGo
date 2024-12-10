export const quizData = {
    javascript: [
      {
        question: "What is the result of 2 + '2' in JavaScript?",
        options: ["22", "4", "undefined", "NaN"],
        correctAnswer: "22",
      },
      {
        question: "Which of the following is not a valid JavaScript data type?",
        options: ["Number", "String", "Character", "Boolean"],
        correctAnswer: "Character",
      },
      {
        question:
          "What will the following code output: console.log( typeof NaN );",
        options: ["undefined", "object", "number", "NaN"],
        correctAnswer: "number",
      },
      {
        question:
          "What is the correct syntax to create a function in JavaScript?",
        options: [
          "function: myFunction()",
          "function myFunction()",
          "function = myFunction()",
          "function -> myFunction()",
        ],
        correctAnswer: "function myFunction()",
      },
      {
        question:
          "Which method is used to remove the last element from an array in JavaScript?",
        options: ["pop()", "shift()", "push()", "remove()"],
        correctAnswer: "pop()",
      },
      {
        question:
          "Which of the following is used to declare a variable in JavaScript?",
        options: ["var", "let", "const", "all of the above"],
        correctAnswer: "all of the above",
      },
      {
        question:
          "What will be the value of x after the following code: let x = 10; x++;",
        options: ["11", "10", "NaN", "undefined"],
        correctAnswer: "11",
      },
      {
        question: "What does the '===' operator do in JavaScript?",
        options: [
          "Compares values and data types",
          "Compares values only",
          "Assigns a value",
          "Checks for equality in strings",
        ],
        correctAnswer: "Compares values and data types",
      },
      {
        question:
          "Which of the following is used to loop through an array in JavaScript?",
        options: [
          "for loop",
          "while loop",
          "forEach() method",
          "all of the above",
        ],
        correctAnswer: "all of the above",
      },
      {
        question: "How do you create a new object in JavaScript?",
        options: [
          "let obj = new Object();",
          "let obj = {};",
          "let obj = Object.create();",
          "all of the above",
        ],
        correctAnswer: "all of the above",
      },
    ],
    html: [
      {
        question: "What does HTML stand for?",
        options: [
          "Hyper Text Markup Language",
          "Hyperlinks and Text Markup Language",
          "Home Tool Markup Language",
          "Hyper Text Machine Language",
        ],
        correctAnswer: "Hyper Text Markup Language",
      },
      {
        question: "Which HTML tag is used to define an internal style sheet?",
        options: ["<style>", "<css>", "<script>", "<link>"],
        correctAnswer: "<style>",
      },
      {
        question: "What is the correct HTML element for inserting a line break?",
        options: ["<break>", "<lb>", "<br>", "<line>"],
        correctAnswer: "<br>",
      },
      {
        question:
          "Which of the following is the correct HTML element for inserting an image?",
        options: ["<image>", "<img>", "<pic>", "<src>"],
        correctAnswer: "<img>",
      },
      {
        question:
          "Which attribute is used to provide the URL for an external hyperlink?",
        options: ["src", "href", "link", "url"],
        correctAnswer: "href",
      },
      {
        question: "How do you create a hyperlink in HTML?",
        options: [
          "<a href='url'>Link</a>",
          "<link url='url'>Link</link>",
          "<href='url'>Link</href>",
          "<url='url'>Link</url>",
        ],
        correctAnswer: "<a href='url'>Link</a>",
      },
      {
        question: "Which HTML tag is used to define an unordered list?",
        options: ["<ol>", "<ul>", "<list>", "<dl>"],
        correctAnswer: "<ul>",
      },
      {
        question: "What is the correct HTML tag for creating a table?",
        options: ["<table>", "<tab>", "<table-data>", "<grid>"],
        correctAnswer: "<table>",
      },
      {
        question:
          "Which of the following is the correct way to add a comment in HTML?",
        options: [
          "<!-- This is a comment -->",
          "// This is a comment",
          "# This is a comment",
          "/* This is a comment */",
        ],
        correctAnswer: "<!-- This is a comment -->",
      },
      {
        question: "Which HTML element is used to define a form for user input?",
        options: ["<form>", "<input>", "<textarea>", "<select>"],
        correctAnswer: "<form>",
      },
    ],
    css: [
      {
        question: "What does CSS stand for?",
        options: [
          "Cascading Style Sheets",
          "Creative Style Sheets",
          "Computer Style Sheets",
          "Colorful Style Sheets",
        ],
        correctAnswer: "Cascading Style Sheets",
      },
      {
        question:
          "Which property is used to change the background color of an element?",
        options: ["color", "bgcolor", "background-color", "background"],
        correctAnswer: "background-color",
      },
      {
        question: "Which CSS property is used to change the font of an element?",
        options: ["font-style", "font-family", "font-weight", "text-font"],
        correctAnswer: "font-family",
      },
      {
        question:
          "Which property is used to change the text color of an element?",
        options: ["color", "text-color", "font-color", "background-color"],
        correctAnswer: "color",
      },
      {
        question:
          "Which of the following CSS properties is used to control the space between the content and the border of an element?",
        options: ["padding", "margin", "border-spacing", "gap"],
        correctAnswer: "padding",
      },
      {
        question:
          "Which CSS property is used to control the layout of a flex container?",
        options: ["flex-direction", "display", "align-items", "flex-wrap"],
        correctAnswer: "display",
      },
      {
        question: "What is the default value of the 'position' property in CSS?",
        options: ["relative", "absolute", "fixed", "static"],
        correctAnswer: "static",
      },
      {
        question: "Which CSS property is used to change the size of the font?",
        options: ["text-size", "font-size", "size", "text-style"],
        correctAnswer: "font-size",
      },
      {
        question: "How can you center an element horizontally in CSS?",
        options: [
          "margin: auto",
          "text-align: center",
          "align-items: center",
          "position: center",
        ],
        correctAnswer: "margin: auto",
      },
      {
        question:
          "Which CSS property is used to add space between two inline elements?",
        options: ["margin", "padding", "border", "gap"],
        correctAnswer: "margin",
      },
    ],
    java: [
      {
        question: "Which of the following is not a Java feature?",
        options: [
          "Object-oriented",
          "Use of pointers",
          "Platform independent",
          "Dynamic",
        ],
        correctAnswer: "Use of pointers",
      },
      {
        question: "What is the size of an int in Java?",
        options: ["4 bytes", "2 bytes", "8 bytes", "Depends on the system"],
        correctAnswer: "4 bytes",
      },
      {
        question:
          "Which keyword is used to create an instance of a class in Java?",
        options: ["create", "new", "class", "object"],
        correctAnswer: "new",
      },
      {
        question: "What is the default value of a boolean variable in Java?",
        options: ["true", "false", "0", "null"],
        correctAnswer: "false",
      },
      {
        question:
          "Which of these is a valid way to start the main method in Java?",
        options: [
          "public static void main(String[] args)",
          "public void main(String args)",
          "void main(String args[])",
          "static public void Main(String args)",
        ],
        correctAnswer: "public static void main(String[] args)",
      },
      {
        question: "What is the purpose of the `super` keyword in Java?",
        options: [
          "To call the superclass constructor",
          "To access superclass methods and variables",
          "To refer to the immediate parent class object",
          "All of the above",
        ],
        correctAnswer: "All of the above",
      },
      {
        question:
          "Which exception is thrown when an array is accessed with an invalid index?",
        options: [
          "ArrayIndexOutOfBoundsException",
          "NullPointerException",
          "IllegalArgumentException",
          "IndexOutOfRangeException",
        ],
        correctAnswer: "ArrayIndexOutOfBoundsException",
      },
      {
        question:
          'What is the output of `System.out.println(10 + 20 + "Java");`?',
        options: ["Java30", "30Java", "1020Java", "Java1020"],
        correctAnswer: "30Java",
      },
      {
        question: "Which collection in Java is synchronized?",
        options: ["HashMap", "Vector", "ArrayList", "LinkedList"],
        correctAnswer: "Vector",
      },
      {
        question:
          "Which of the following is not a valid access modifier in Java?",
        options: ["public", "private", "protected", "internal"],
        correctAnswer: "internal",
      },
    ],
    cpp: [
      {
        question: "Who is known as the father of C++?",
        options: [
          "Dennis Ritchie",
          "Bjarne Stroustrup",
          "James Gosling",
          "Guido van Rossum",
        ],
        correctAnswer: "Bjarne Stroustrup",
      },
      {
        question: "Which of the following is not a valid C++ data type?",
        options: ["int", "float", "real", "double"],
        correctAnswer: "real",
      },
      {
        question: "Which operator is used to allocate memory dynamically in C++?",
        options: ["malloc", "alloc", "new", "allocate"],
        correctAnswer: "new",
      },
      {
        question: "What is the correct syntax to declare a pointer in C++?",
        options: ["int ptr;", "int* ptr;", "int &ptr;", "int ptr[];"],
        correctAnswer: "int* ptr;",
      },
      {
        question: "Which of the following is used to define a constant in C++?",
        options: ["const", "#define", "static const", "All of the above"],
        correctAnswer: "All of the above",
      },
      {
        question:
          "What is the default access specifier for class members in C++?",
        options: ["public", "private", "protected", "none"],
        correctAnswer: "private",
      },
      {
        question:
          "Which feature of OOP allows reusing the properties of an existing class?",
        options: ["Encapsulation", "Inheritance", "Polymorphism", "Abstraction"],
        correctAnswer: "Inheritance",
      },
      {
        question: "What does the 'this' pointer represent in C++?",
        options: [
          "A pointer to the current object",
          "A pointer to the base class object",
          "A pointer to the parent class object",
          "None of the above",
        ],
        correctAnswer: "A pointer to the current object",
      },
      {
        question:
          "Which header file is required for using input and output in C++?",
        options: ["iostream", "stdio.h", "stdlib.h", "istream"],
        correctAnswer: "iostream",
      },
      {
        question:
          "Which of the following is used to catch all exceptions in C++?",
        options: ["catch(...)", "catch()", "catch(*)", "catch(Exception)"],
        correctAnswer: "catch(...)",
      },
    ],
    c: [
      {
        question: "Who is known as the father of the C programming language?",
        options: [
          "Dennis Ritchie",
          "Ken Thompson",
          "Bjarne Stroustrup",
          "James Gosling",
        ],
        correctAnswer: "Dennis Ritchie",
      },
      {
        question:
          "Which of the following is the correct syntax to declare a variable in C?",
        options: ["int x;", "x int;", "int = x;", "declare int x;"],
        correctAnswer: "int x;",
      },
      {
        question: "What is the size of an int data type in C?",
        options: ["2 bytes", "4 bytes", "Depends on the system", "8 bytes"],
        correctAnswer: "Depends on the system",
      },
      {
        question: "Which of the following is used to terminate a statement in C?",
        options: [";", ":", ".", ","],
        correctAnswer: ";",
      },
      {
        question: "Which keyword is used to return a value from a function in C?",
        options: ["send", "return", "give", "exit"],
        correctAnswer: "return",
      },
      {
        question:
          'What is the output of the following code?\n`printf("%d", 10 > 5);`',
        options: ["10", "5", "1", "0"],
        correctAnswer: "1",
      },
      {
        question: "Which of these is not a valid storage class in C?",
        options: ["auto", "register", "static", "dynamic"],
        correctAnswer: "dynamic",
      },
      {
        question: "What is the purpose of the `#include` directive in C?",
        options: [
          "To include header files",
          "To define macros",
          "To declare variables",
          "To start the main function",
        ],
        correctAnswer: "To include header files",
      },
      {
        question:
          "What is the correct format specifier for printing a float value in C?",
        options: ["%f", "%d", "%c", "%lf"],
        correctAnswer: "%f",
      },
      {
        question: "Which function is used to allocate memory dynamically in C?",
        options: ["malloc()", "alloc()", "new()", "create()"],
        correctAnswer: "malloc()",
      },
    ],
    golang: [
      {
        question: "Who developed the Go programming language?",
        options: ["Microsoft", "Google", "Apple", "Facebook"],
        correctAnswer: "Google",
      },
      {
        question:
          "Which of the following is the correct way to declare a variable in Go?",
        options: ["var x int", "int x;", "let x: int", "int x = 0;"],
        correctAnswer: "var x int",
      },
      {
        question: "Which keyword is used to create a new goroutine in Go?",
        options: ["go", "goroutine", "thread", "routine"],
        correctAnswer: "go",
      },
      {
        question:
          "What is the default value of an uninitialized int variable in Go?",
        options: ["0", "nil", "undefined", "1"],
        correctAnswer: "0",
      },
      {
        question:
          "Which package is used to handle input and output operations in Go?",
        options: ["fmt", "io", "os", "input"],
        correctAnswer: "fmt",
      },
      {
        question: "What is the purpose of the `defer` keyword in Go?",
        options: [
          "To handle errors",
          "To execute a function after the surrounding function completes",
          "To create a goroutine",
          "To define a constant",
        ],
        correctAnswer:
          "To execute a function after the surrounding function completes",
      },
      {
        question: "Which data type is used to represent textual data in Go?",
        options: ["text", "string", "char", "str"],
        correctAnswer: "string",
      },
      {
        question: "How do you import multiple packages in Go?",
        options: [
          'import ("fmt" "os")',
          'import {"fmt", "os"}',
          "import fmt, os",
          "import: fmt, os",
        ],
        correctAnswer: 'import ("fmt" "os")',
      },
      {
        question: "What is the purpose of the `make()` function in Go?",
        options: [
          "To allocate and initialize slices, maps, or channels",
          "To allocate memory for structs",
          "To create new variables",
          "To start a goroutine",
        ],
        correctAnswer: "To allocate and initialize slices, maps, or channels",
      },
      {
        question:
          "What is the default visibility of a function or variable defined in a Go package?",
        options: ["Public", "Private", "Internal", "Protected"],
        correctAnswer: "Private",
      },
    ],
    reactjs: [
      {
        question: "What is React?",
        options: [
          "A backend framework",
          "A JavaScript library for building user interfaces",
          "A database management system",
          "A CSS preprocessor",
        ],
        correctAnswer: "A JavaScript library for building user interfaces",
      },
      {
        question: "What is JSX?",
        options: [
          "A syntax extension for JavaScript",
          "A database query language",
          "A JavaScript framework",
          "A type of React component",
        ],
        correctAnswer: "A syntax extension for JavaScript",
      },
      {
        question:
          "Which method is used to update state in a React class component?",
        options: ["setState()", "useState()", "updateState()", "changeState()"],
        correctAnswer: "setState()",
      },
      {
        question: "What are React hooks?",
        options: [
          "Functions that allow you to use state and other React features in functional components",
          "Functions to create class components",
          "Methods for server-side rendering",
          "A way to fetch data in React",
        ],
        correctAnswer:
          "Functions that allow you to use state and other React features in functional components",
      },
      {
        question: "Which hook is used to manage state in a functional component?",
        options: ["useState", "useEffect", "useReducer", "useContext"],
        correctAnswer: "useState",
      },
      {
        question: "What is the purpose of the useEffect hook?",
        options: [
          "To handle state updates",
          "To perform side effects like fetching data or updating the DOM",
          "To manage global state",
          "To create context providers",
        ],
        correctAnswer:
          "To perform side effects like fetching data or updating the DOM",
      },
      {
        question: "What is a React component?",
        options: [
          "A reusable piece of UI",
          "A function to manage state",
          "A method for server-side rendering",
          "A way to define routes in an app",
        ],
        correctAnswer: "A reusable piece of UI",
      },
      {
        question: "What is the Virtual DOM in React?",
        options: [
          "A copy of the real DOM that React uses to optimize updates",
          "A database for managing state",
          "A CSS framework for styling components",
          "A method for rendering HTML templates",
        ],
        correctAnswer:
          "A copy of the real DOM that React uses to optimize updates",
      },
      {
        question:
          "How do you pass data from a parent to a child component in React?",
        options: ["Using props", "Using state", "Using context", "Using hooks"],
        correctAnswer: "Using props",
      },
      {
        question: "What is the purpose of React's 'key' prop?",
        options: [
          "To uniquely identify elements in a list for efficient updates",
          "To set event handlers for elements",
          "To pass state between components",
          "To define styles for elements",
        ],
        correctAnswer:
          "To uniquely identify elements in a list for efficient updates",
      },
    ],
    nodejs: [
      {
        question: "What is Node.js?",
        options: [
          "A frontend JavaScript framework",
          "A JavaScript runtime built on Chrome's V8 engine",
          "A database management tool",
          "A CSS preprocessor",
        ],
        correctAnswer: "A JavaScript runtime built on Chrome's V8 engine",
      },
      {
        question: "Which of the following is true about Node.js?",
        options: [
          "It is single-threaded and asynchronous",
          "It is multi-threaded and synchronous",
          "It is single-threaded and synchronous",
          "It is multi-threaded and asynchronous",
        ],
        correctAnswer: "It is single-threaded and asynchronous",
      },
      {
        question:
          "Which module is used to handle file system operations in Node.js?",
        options: ["fs", "file", "filesystem", "os"],
        correctAnswer: "fs",
      },
      {
        question: "What is npm?",
        options: [
          "A package manager for Node.js",
          "A Node.js framework",
          "A file system module",
          "A debugging tool for JavaScript",
        ],
        correctAnswer: "A package manager for Node.js",
      },
      {
        question: "Which method is used to create a server in Node.js?",
        options: [
          "createServer()",
          "httpServer()",
          "serverStart()",
          "newServer()",
        ],
        correctAnswer: "createServer()",
      },
      {
        question: "How do you import a module in Node.js?",
        options: [
          "import module from 'module';",
          "require('module');",
          "include('module');",
          "load('module');",
        ],
        correctAnswer: "require('module');",
      },
      {
        question: "Which of the following is NOT a core module in Node.js?",
        options: ["http", "path", "events", "jquery"],
        correctAnswer: "jquery",
      },
      {
        question: "What is the purpose of the `process` module in Node.js?",
        options: [
          "To handle HTTP requests",
          "To provide information and control over the Node.js runtime",
          "To manage file system operations",
          "To create APIs",
        ],
        correctAnswer:
          "To provide information and control over the Node.js runtime",
      },
      {
        question: "What is the default scope of modules in Node.js?",
        options: [
          "Global",
          "Local to the module",
          "Shared across all modules",
          "Restricted to functions",
        ],
        correctAnswer: "Local to the module",
      },
      {
        question: "Which of these streams is used to read data in Node.js?",
        options: ["Writable", "Readable", "Duplex", "Transform"],
        correctAnswer: "Readable",
      },
    ],
    sql: [
      {
        question: "What does SQL stand for?",
        options: [
          "Structured Query Language",
          "Structured Question Language",
          "Simple Query Language",
          "Standard Query Language",
        ],
        correctAnswer: "Structured Query Language",
      },
      {
        question: "Which SQL statement is used to retrieve data from a database?",
        options: ["GET", "SELECT", "FETCH", "RETRIEVE"],
        correctAnswer: "SELECT",
      },
      {
        question: "Which clause is used to filter records in SQL?",
        options: ["WHERE", "HAVING", "GROUP BY", "FILTER"],
        correctAnswer: "WHERE",
      },
      {
        question: "What is the purpose of the GROUP BY clause in SQL?",
        options: [
          "To filter rows based on conditions",
          "To group rows sharing a property and perform aggregate functions on them",
          "To join two tables",
          "To rename a table or column",
        ],
        correctAnswer:
          "To group rows sharing a property and perform aggregate functions on them",
      },
      {
        question:
          "Which SQL function is used to count the number of rows in a table?",
        options: ["SUM()", "COUNT()", "ROWS()", "TOTAL()"],
        correctAnswer: "COUNT()",
      },
      {
        question:
          "Which keyword is used to remove duplicate rows in a query result?",
        options: ["REMOVE", "DISTINCT", "UNIQUE", "NODUPLICATE"],
        correctAnswer: "DISTINCT",
      },
      {
        question: "Which command is used to modify an existing table in SQL?",
        options: ["ALTER", "UPDATE", "MODIFY", "CHANGE"],
        correctAnswer: "ALTER",
      },
      {
        question: "Which SQL keyword is used to sort the result-set?",
        options: ["SORT", "ORDER BY", "GROUP BY", "SORT BY"],
        correctAnswer: "ORDER BY",
      },
      {
        question: "What is a primary key in SQL?",
        options: [
          "A column with unique values that identifies each row",
          "A column that stores the main data of the table",
          "A key to unlock encrypted data",
          "A column that can have duplicate values",
        ],
        correctAnswer: "A column with unique values that identifies each row",
      },
      {
        question: "Which SQL statement is used to delete data from a table?",
        options: ["REMOVE", "DELETE", "DROP", "ERASE"],
        correctAnswer: "DELETE",
      },
    ],
    mongodb: [
      {
        question: "What type of database is MongoDB?",
        options: [
          "Relational Database",
          "Document-Oriented Database",
          "Key-Value Store",
          "Graph Database",
        ],
        correctAnswer: "Document-Oriented Database",
      },
      {
        question: "Which query language does MongoDB use?",
        options: ["SQL", "NoSQL", "Mongo Query Language", "None"],
        correctAnswer: "None",
      },
      {
        question: "What is a collection in MongoDB?",
        options: [
          "A group of related tables",
          "A group of MongoDB documents",
          "A column in a table",
          "A single data entry",
        ],
        correctAnswer: "A group of MongoDB documents",
      },
      {
        question: "What format does MongoDB use to store data?",
        options: ["XML", "JSON", "BSON", "CSV"],
        correctAnswer: "BSON",
      },
      {
        question:
          "Which command is used to insert data into a MongoDB collection?",
        options: [
          "INSERT",
          "db.collection.insert()",
          "ADD",
          "db.collection.save()",
        ],
        correctAnswer: "db.collection.insert()",
      },
      {
        question: "How do you retrieve all documents from a MongoDB collection?",
        options: [
          "db.collection.find()",
          "db.collection.getAll()",
          "SELECT * FROM collection",
          "db.collection.retrieve()",
        ],
        correctAnswer: "db.collection.find()",
      },
      {
        question: "What does the `ObjectId` in MongoDB represent?",
        options: [
          "A unique identifier for each document",
          "The primary key for a collection",
          "A timestamp of document creation",
          "A version number for the document",
        ],
        correctAnswer: "A unique identifier for each document",
      },
      {
        question: "What is the purpose of indexing in MongoDB?",
        options: [
          "To store data",
          "To improve query performance",
          "To replicate data",
          "To enforce schema rules",
        ],
        correctAnswer: "To improve query performance",
      },
      {
        question:
          "Which feature of MongoDB allows data distribution across multiple servers?",
        options: ["Replication", "Sharding", "Indexing", "Partitioning"],
        correctAnswer: "Sharding",
      },
      {
        question: "Which command is used to delete a collection in MongoDB?",
        options: [
          "DELETE COLLECTION",
          "db.collection.drop()",
          "REMOVE COLLECTION",
          "db.collection.delete()",
        ],
        correctAnswer: "db.collection.drop()",
      },
    ],
    aws: [
      {
        question: "What does AWS stand for?",
        options: [
          "Amazon Web System",
          "Amazon Web Services",
          "Advanced Web Server",
          "Amazon Wide Services",
        ],
        correctAnswer: "Amazon Web Services",
      },
      {
        question: "Which of the following is a compute service provided by AWS?",
        options: ["EC2", "S3", "RDS", "CloudFront"],
        correctAnswer: "EC2",
      },
      {
        question: "What is Amazon S3 used for?",
        options: [
          "Hosting databases",
          "Storing objects and files",
          "Running applications",
          "Monitoring network traffic",
        ],
        correctAnswer: "Storing objects and files",
      },
      {
        question: "What does IAM stand for in AWS?",
        options: [
          "Identity Access Management",
          "Internet Access Module",
          "Instance Access Management",
          "Identity Application Manager",
        ],
        correctAnswer: "Identity Access Management",
      },
      {
        question: "Which service is used for serverless computing in AWS?",
        options: ["Lambda", "EC2", "DynamoDB", "RDS"],
        correctAnswer: "Lambda",
      },
      {
        question: "What is the primary purpose of Amazon CloudFront?",
        options: [
          "Content Delivery Network (CDN)",
          "Database management",
          "Server provisioning",
          "Log monitoring",
        ],
        correctAnswer: "Content Delivery Network (CDN)",
      },
      {
        question: "What is the role of AWS CloudFormation?",
        options: [
          "Automating deployment of infrastructure as code",
          "Monitoring cloud resources",
          "Hosting websites",
          "Encrypting data",
        ],
        correctAnswer: "Automating deployment of infrastructure as code",
      },
      {
        question:
          "Which database service is provided by AWS for NoSQL workloads?",
        options: ["RDS", "DynamoDB", "Aurora", "Redshift"],
        correctAnswer: "DynamoDB",
      },
      {
        question: "What is the purpose of an Amazon VPC?",
        options: [
          "To create a virtual private network for secure communication",
          "To host databases",
          "To manage identity and access control",
          "To deploy containers",
        ],
        correctAnswer:
          "To create a virtual private network for secure communication",
      },
      {
        question:
          "Which AWS service is used to monitor and observe resources and applications?",
        options: ["CloudWatch", "CloudTrail", "IAM", "Trusted Advisor"],
        correctAnswer: "CloudWatch",
      },
    ],
    azure: [
      {
        question: "What is Microsoft Azure?",
        options: [
          "A cloud computing platform and service by Microsoft",
          "A database management system",
          "A web hosting platform",
          "A programming language",
        ],
        correctAnswer: "A cloud computing platform and service by Microsoft",
      },
      {
        question:
          "Which service in Azure is used for deploying virtual machines?",
        options: [
          "Azure VM",
          "Azure Functions",
          "Azure Container Apps",
          "Azure Blob",
        ],
        correctAnswer: "Azure VM",
      },
      {
        question: "What is the purpose of Azure Blob Storage?",
        options: [
          "To store unstructured data",
          "To manage relational databases",
          "To host virtual machines",
          "To create web applications",
        ],
        correctAnswer: "To store unstructured data",
      },
      {
        question: "Which Azure service is used for creating and managing APIs?",
        options: [
          "Azure API Management",
          "Azure Functions",
          "Azure Logic Apps",
          "Azure SQL",
        ],
        correctAnswer: "Azure API Management",
      },
      {
        question: "What is the purpose of Azure Active Directory (Azure AD)?",
        options: [
          "To manage user identities and access",
          "To store and retrieve files",
          "To deploy web applications",
          "To create virtual networks",
        ],
        correctAnswer: "To manage user identities and access",
      },
      {
        question: "What is Azure Kubernetes Service (AKS) used for?",
        options: [
          "Managing virtual machines",
          "Orchestrating containerized applications",
          "Storing container images",
          "Building web APIs",
        ],
        correctAnswer: "Orchestrating containerized applications",
      },
      {
        question: "Which Azure service is used for serverless computing?",
        options: [
          "Azure Functions",
          "Azure VM",
          "Azure SQL",
          "Azure Blob Storage",
        ],
        correctAnswer: "Azure Functions",
      },
      {
        question: "What is Azure DevOps used for?",
        options: [
          "Continuous integration and delivery (CI/CD)",
          "Hosting databases",
          "Monitoring network traffic",
          "Encrypting files",
        ],
        correctAnswer: "Continuous integration and delivery (CI/CD)",
      },
      {
        question:
          "Which database service is a fully managed NoSQL offering in Azure?",
        options: [
          "Azure Cosmos DB",
          "Azure SQL Database",
          "Azure Blob",
          "Azure DevOps",
        ],
        correctAnswer: "Azure Cosmos DB",
      },
      {
        question: "Which tool in Azure helps track resource usage and cost?",
        options: [
          "Azure Cost Management",
          "Azure Monitor",
          "Azure DevOps",
          "Azure Resource Manager",
        ],
        correctAnswer: "Azure Cost Management",
      },
    ],
    ml: [
      {
        question: "What is Machine Learning?",
        options: [
          "A method of programming robots",
          "A subset of AI where machines learn from data",
          "A way to hardcode decision-making",
          "A programming paradigm for building APIs",
        ],
        correctAnswer: "A subset of AI where machines learn from data",
      },
      {
        question: "Which of these is a supervised learning algorithm?",
        options: ["Linear Regression", "K-Means Clustering", "PCA", "DBSCAN"],
        correctAnswer: "Linear Regression",
      },
      {
        question: "What is overfitting in machine learning?",
        options: [
          "When a model is too simple and underperforms",
          "When a model performs well on training data but poorly on unseen data",
          "When a model cannot fit the training data",
          "When the training data is insufficient",
        ],
        correctAnswer:
          "When a model performs well on training data but poorly on unseen data",
      },
      {
        question: "What is a common use case of unsupervised learning?",
        options: ["Clustering", "Classification", "Regression", "Prediction"],
        correctAnswer: "Clustering",
      },
      {
        question:
          "Which library is commonly used for machine learning in Python?",
        options: ["TensorFlow", "React", "Scikit-learn", "Node.js"],
        correctAnswer: "Scikit-learn",
      },
      {
        question: "What does the term 'feature' mean in machine learning?",
        options: [
          "The output variable",
          "An attribute or input variable used for training a model",
          "The number of samples in the dataset",
          "A type of algorithm",
        ],
        correctAnswer: "An attribute or input variable used for training a model",
      },
      {
        question: "What is the purpose of a validation set?",
        options: [
          "To tune hyperparameters",
          "To train the model",
          "To test the model after training",
          "To reduce the size of the dataset",
        ],
        correctAnswer: "To tune hyperparameters",
      },
      {
        question: "Which type of learning involves rewards and penalties?",
        options: [
          "Supervised Learning",
          "Reinforcement Learning",
          "Unsupervised Learning",
          "Semi-supervised Learning",
        ],
        correctAnswer: "Reinforcement Learning",
      },
      {
        question: "Which metric is commonly used for regression tasks?",
        options: ["Mean Squared Error", "Accuracy", "F1 Score", "Recall"],
        correctAnswer: "Mean Squared Error",
      },
      {
        question: "What is gradient descent used for in machine learning?",
        options: [
          "Optimizing the loss function",
          "Data preprocessing",
          "Feature scaling",
          "Regularizing the model",
        ],
        correctAnswer: "Optimizing the loss function",
      },
    ],
    deeplearning: [
      {
        question: "What is Deep Learning?",
        options: [
          "A branch of AI focusing on neural networks with many layers",
          "A way to program robots",
          "A set of rules for making decisions",
          "A type of unsupervised learning",
        ],
        correctAnswer:
          "A branch of AI focusing on neural networks with many layers",
      },
      {
        question:
          "What is the most commonly used activation function in deep learning?",
        options: ["ReLU", "Sigmoid", "Tanh", "Softmax"],
        correctAnswer: "ReLU",
      },
      {
        question:
          "What is a convolutional neural network (CNN) primarily used for?",
        options: [
          "Image and video recognition tasks",
          "Speech synthesis",
          "Natural language processing",
          "Data clustering",
        ],
        correctAnswer: "Image and video recognition tasks",
      },
      {
        question: "What does the term 'epoch' refer to in deep learning?",
        options: [
          "One forward and backward pass of the entire dataset",
          "The time taken to train the model",
          "A single layer in the neural network",
          "A single data point in the dataset",
        ],
        correctAnswer: "One forward and backward pass of the entire dataset",
      },
      {
        question: "Which library is popular for building deep learning models?",
        options: ["TensorFlow", "Scikit-learn", "Pandas", "Matplotlib"],
        correctAnswer: "TensorFlow",
      },
      {
        question: "What is the role of a loss function in deep learning?",
        options: [
          "To evaluate how well the model predicts the target values",
          "To preprocess the data",
          "To initialize weights",
          "To add noise to the training data",
        ],
        correctAnswer:
          "To evaluate how well the model predicts the target values",
      },
      {
        question: "What is dropout in a deep learning model?",
        options: [
          "A regularization technique to prevent overfitting",
          "A technique to add layers to the model",
          "A data augmentation method",
          "A way to remove outliers from data",
        ],
        correctAnswer: "A regularization technique to prevent overfitting",
      },
      {
        question:
          "Which type of neural network is best suited for sequential data like text?",
        options: [
          "Recurrent Neural Networks (RNNs)",
          "CNNs",
          "Feedforward Neural Networks",
          "Autoencoders",
        ],
        correctAnswer: "Recurrent Neural Networks (RNNs)",
      },
      {
        question: "What is backpropagation used for?",
        options: [
          "Adjusting weights based on the error gradient",
          "Preprocessing data",
          "Scaling features",
          "Visualizing data",
        ],
        correctAnswer: "Adjusting weights based on the error gradient",
      },
      {
        question: "What is the vanishing gradient problem in deep learning?",
        options: [
          "When gradients become too small during training, slowing down learning",
          "When gradients explode during training",
          "When the model cannot converge",
          "When the dataset is too small",
        ],
        correctAnswer:
          "When gradients become too small during training, slowing down learning",
      },
    ],
    ethicalhacking: [
      {
        question: "What is Ethical Hacking?",
        options: [
          "Hacking to test and improve security with permission",
          "Hacking for malicious purposes",
          "Hacking a system to steal information",
          "Hacking without any rules or permissions",
        ],
        correctAnswer: "Hacking to test and improve security with permission",
      },
      {
        question:
          "Which of the following is the most commonly used tool for penetration testing?",
        options: ["Wireshark", "Nmap", "Photoshop", "Google Chrome"],
        correctAnswer: "Nmap",
      },
      {
        question: "What is a 'Zero-Day' vulnerability?",
        options: [
          "A vulnerability that is known by the public but not patched",
          "A vulnerability that is exploited before the vendor has fixed it",
          "A vulnerability that has been fixed by the vendor",
          "A vulnerability that cannot be exploited",
        ],
        correctAnswer:
          "A vulnerability that is exploited before the vendor has fixed it",
      },
      {
        question: "What does a 'Denial of Service (DoS)' attack do?",
        options: [
          "Overloads a system to make it unavailable to legitimate users",
          "Steals user credentials",
          "Infiltrates a system to exfiltrate data",
          "Encrypts the system and demands ransom",
        ],
        correctAnswer:
          "Overloads a system to make it unavailable to legitimate users",
      },
      {
        question: "Which of the following is an example of social engineering?",
        options: [
          "Phishing emails to trick users into revealing personal information",
          "Brute force attacks on passwords",
          "Using malware to exploit a system vulnerability",
          "Spying on network traffic",
        ],
        correctAnswer:
          "Phishing emails to trick users into revealing personal information",
      },
      {
        question: "Which port is commonly used for HTTPS traffic?",
        options: ["80", "443", "21", "25"],
        correctAnswer: "443",
      },
      {
        question: "What is a firewall used for in cybersecurity?",
        options: [
          "To prevent unauthorized access to a network",
          "To encrypt sensitive data",
          "To monitor system processes",
          "To store user credentials",
        ],
        correctAnswer: "To prevent unauthorized access to a network",
      },
      {
        question:
          "What does the term 'hacking' typically refer to in ethical hacking?",
        options: [
          "Breaking into systems with malicious intent",
          "Exploiting vulnerabilities for financial gain",
          "Gaining authorized access to a system to improve its security",
          "Attacking systems with a virus",
        ],
        correctAnswer:
          "Gaining authorized access to a system to improve its security",
      },
      {
        question: "What is a VPN used for?",
        options: [
          "To bypass network restrictions and encrypt internet traffic",
          "To monitor network performance",
          "To install security patches automatically",
          "To monitor email activity",
        ],
        correctAnswer:
          "To bypass network restrictions and encrypt internet traffic",
      },
      {
        question:
          "Which of the following is the goal of an ethical hacker during penetration testing?",
        options: [
          "To cause damage to the system",
          "To find and report vulnerabilities to the system owner",
          "To steal sensitive data",
          "To disrupt services for ransom",
        ],
        correctAnswer: "To find and report vulnerabilities to the system owner",
      },
    ],
    devops: [
      {
        question: "What is DevOps?",
        options: [
          "A software development methodology focused on collaboration between development and IT operations",
          "A project management tool",
          "A type of cloud computing",
          "A testing methodology",
        ],
        correctAnswer:
          "A software development methodology focused on collaboration between development and IT operations",
      },
      {
        question:
          "Which of the following is a version control system commonly used in DevOps?",
        options: ["Git", "Maven", "Jenkins", "Docker"],
        correctAnswer: "Git",
      },
      {
        question: "What does CI/CD stand for in DevOps?",
        options: [
          "Continuous Integration and Continuous Deployment",
          "Centralized Integration and Continuous Delivery",
          "Critical Integration and Critical Deployment",
          "Centralized Innovation and Centralized Delivery",
        ],
        correctAnswer: "Continuous Integration and Continuous Deployment",
      },
      {
        question: "Which tool is used for automating deployment in DevOps?",
        options: ["Jenkins", "MySQL", "Kubernetes", "PHP"],
        correctAnswer: "Jenkins",
      },
      {
        question: "What is the primary purpose of containerization in DevOps?",
        options: [
          "To run applications in isolated environments",
          "To store large datasets",
          "To monitor performance",
          "To manage user accounts",
        ],
        correctAnswer: "To run applications in isolated environments",
      },
      {
        question: "Which of these is a popular container orchestration tool?",
        options: ["Kubernetes", "Jenkins", "Git", "MySQL"],
        correctAnswer: "Kubernetes",
      },
      {
        question: "What is Infrastructure as Code (IaC)?",
        options: [
          "Managing infrastructure using code instead of manual processes",
          "Automating the software development process",
          "A type of programming language",
          "A way to monitor application performance",
        ],
        correctAnswer:
          "Managing infrastructure using code instead of manual processes",
      },
      {
        question:
          "Which of the following is a configuration management tool used in DevOps?",
        options: ["Ansible", "Docker", "Kubernetes", "React"],
        correctAnswer: "Ansible",
      },
      {
        question: "What is the purpose of monitoring in DevOps?",
        options: [
          "To track the health and performance of applications and infrastructure",
          "To code applications",
          "To store source code",
          "To manage databases",
        ],
        correctAnswer:
          "To track the health and performance of applications and infrastructure",
      },
      {
        question: "Which cloud platform is commonly used in DevOps?",
        options: ["AWS", "Node.js", "Java", "C++"],
        correctAnswer: "AWS",
      },
    ],
    flutter: [
      {
        question: "What is Flutter?",
        options: [
          "A UI framework for building natively compiled applications for mobile, web, and desktop",
          "A type of mobile database",
          "A mobile operating system",
          "A version control tool",
        ],
        correctAnswer:
          "A UI framework for building natively compiled applications for mobile, web, and desktop",
      },
      {
        question: "Which language is primarily used to write Flutter apps?",
        options: ["Dart", "JavaScript", "Java", "Python"],
        correctAnswer: "Dart",
      },
      {
        question: "What is a widget in Flutter?",
        options: [
          "A user interface component in Flutter",
          "A type of data storage",
          "A backend tool",
          "A device used to run Flutter apps",
        ],
        correctAnswer: "A user interface component in Flutter",
      },
      {
        question: "Which of these is used for navigation in Flutter?",
        options: ["Navigator", "Router", "PageView", "ListView"],
        correctAnswer: "Navigator",
      },
      {
        question: "What is the purpose of a `StatefulWidget` in Flutter?",
        options: [
          "It can hold mutable state that can change over time",
          "It represents a screen in an app",
          "It is used for storing data",
          "It cannot update the UI",
        ],
        correctAnswer: "It can hold mutable state that can change over time",
      },
      {
        question: "How do you manage state in Flutter?",
        options: ["Provider", "setState", "Redux", "All of the above"],
        correctAnswer: "All of the above",
      },
      {
        question: "Which of the following is the method to run a Flutter app?",
        options: [
          "flutter run",
          "flutter start",
          "flutter execute",
          "flutter build",
        ],
        correctAnswer: "flutter run",
      },
      {
        question: "What is `pubspec.yaml` in Flutter?",
        options: [
          "A file to manage dependencies and project settings",
          "A tool for debugging Flutter apps",
          "A folder for storing assets",
          "A library used in Flutter",
        ],
        correctAnswer: "A file to manage dependencies and project settings",
      },
      {
        question: "What is `hot reload` in Flutter?",
        options: [
          "A feature to instantly apply code changes without losing the app state",
          "A method to compile the Flutter app",
          "A debugging tool",
          "A Flutter plugin",
        ],
        correctAnswer:
          "A feature to instantly apply code changes without losing the app state",
      },
      {
        question: "Which command is used to create a new Flutter project?",
        options: [
          "flutter create",
          "flutter start",
          "flutter init",
          "flutter new",
        ],
        correctAnswer: "flutter create",
      },
    ],
    blockchain: [
      {
        question: "What is Blockchain?",
        options: [
          "A decentralized digital ledger used for recording transactions",
          "A type of database",
          "A cryptocurrency",
          "A cloud storage solution",
        ],
        correctAnswer:
          "A decentralized digital ledger used for recording transactions",
      },
      {
        question:
          "Which of the following is a blockchain platform for creating decentralized applications?",
        options: ["Ethereum", "Bitcoin", "Litecoin", "Ripple"],
        correctAnswer: "Ethereum",
      },
      {
        question: "What is a smart contract in blockchain?",
        options: [
          "A self-executing contract with the terms of agreement written directly in code",
          "A legal agreement that requires a lawyer",
          "A blockchain currency",
          "A way to store encrypted data",
        ],
        correctAnswer:
          "A self-executing contract with the terms of agreement written directly in code",
      },
      {
        question: "Which consensus mechanism does Bitcoin use?",
        options: [
          "Proof of Work",
          "Proof of Stake",
          "Delegated Proof of Stake",
          "Byzantine Fault Tolerance",
        ],
        correctAnswer: "Proof of Work",
      },
      {
        question: "What is a blockchain 'node'?",
        options: [
          "A computer participating in the blockchain network",
          "A wallet address",
          "A type of cryptocurrency",
          "A hashing algorithm",
        ],
        correctAnswer: "A computer participating in the blockchain network",
      },
      {
        question: "What is the purpose of 'mining' in blockchain?",
        options: [
          "To validate transactions and add them to the blockchain",
          "To create new cryptocurrencies",
          "To store blockchain data",
          "To manage cryptocurrency exchanges",
        ],
        correctAnswer: "To validate transactions and add them to the blockchain",
      },
      {
        question: "What is a cryptocurrency wallet?",
        options: [
          "A digital tool for storing, sending, and receiving cryptocurrencies",
          "A physical wallet for storing cash",
          "A bank account for cryptocurrency",
          "A tool to mine cryptocurrencies",
        ],
        correctAnswer:
          "A digital tool for storing, sending, and receiving cryptocurrencies",
      },
      {
        question: "Which of these is a major advantage of blockchain technology?",
        options: [
          "Decentralization and transparency",
          "Centralized control",
          "Faster transaction speeds than traditional banking",
          "Better storage capacity",
        ],
        correctAnswer: "Decentralization and transparency",
      },
      {
        question: "What is a 'hash' in blockchain?",
        options: [
          "A cryptographic function that converts data into a fixed-length string",
          "A type of encryption algorithm",
          "A blockchain currency",
          "A way to compress blockchain data",
        ],
        correctAnswer:
          "A cryptographic function that converts data into a fixed-length string",
      },
      {
        question: "What is 'forking' in blockchain?",
        options: [
          "A situation where a blockchain splits into two separate chains",
          "A process to verify transactions",
          "A method for securing wallets",
          "A technique to create new coins",
        ],
        correctAnswer:
          "A situation where a blockchain splits into two separate chains",
      },
    ],
    androiddevelopment: [
      {
        question: "What is Android?",
        options: [
          "An operating system for mobile devices",
          "A web development framework",
          "A programming language",
          "A game engine",
        ],
        correctAnswer: "An operating system for mobile devices",
      },
      {
        question:
          "Which programming language is primarily used for Android app development?",
        options: ["Java", "C++", "Python", "Swift"],
        correctAnswer: "Java",
      },
      {
        question: "Which file is used to declare permissions in an Android app?",
        options: [
          "AndroidManifest.xml",
          "strings.xml",
          "build.gradle",
          "activity_main.xml",
        ],
        correctAnswer: "AndroidManifest.xml",
      },
      {
        question: "What is the Android SDK?",
        options: [
          "A set of tools for building Android applications",
          "A mobile phone",
          "A library for managing resources",
          "A cloud service for Android",
        ],
        correctAnswer: "A set of tools for building Android applications",
      },
      {
        question: "What is the purpose of 'Intents' in Android?",
        options: [
          "To start activities or services and pass data between components",
          "To manage files on the device",
          "To store user settings",
          "To handle background tasks",
        ],
        correctAnswer:
          "To start activities or services and pass data between components",
      },
      {
        question:
          "Which layout is used to align widgets in rows and columns in Android?",
        options: [
          "LinearLayout",
          "RelativeLayout",
          "GridLayout",
          "ConstraintLayout",
        ],
        correctAnswer: "LinearLayout",
      },
      {
        question: "What is the role of the Android 'Activity' class?",
        options: [
          "It represents a single screen in the app",
          "It manages database operations",
          "It stores application data",
          "It handles network requests",
        ],
        correctAnswer: "It represents a single screen in the app",
      },
      {
        question:
          "Which component is used to run code in the background in Android?",
        options: ["Service", "Activity", "ContentProvider", "BroadcastReceiver"],
        correctAnswer: "Service",
      },
      {
        question:
          "Which of the following is used for handling background tasks in Android?",
        options: ["AsyncTask", "Handler", "Thread", "All of the above"],
        correctAnswer: "All of the above",
      },
      {
        question: "Which Android class is used for managing databases?",
        options: ["SQLiteOpenHelper", "Activity", "Intent", "Service"],
        correctAnswer: "SQLiteOpenHelper",
      },
    ],
};
  