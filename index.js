

let technologies = [
    'HTML',
    'CSS',
    'JavaScript',
    "React",
    "Playwright",
    "Ruby",
    "Go",
    "TypeScript",
    "Node.js",
    "Next.js",
    "AWS S3",
    "Python",
    "MySQL",
    "React Native",
    "Redux",
    "Amazon Web Services",
    "AWS Lambda",
    "GraphQL",
    "Java",
    "jQuery",
    "MongoDB",
    "Clickhouse",
    "Google Cloud Platform",
    "GCP BigQuery",
    "Speech-to-Text",
    "GCP CloudSQL",
    "Git",
    "Bitbucket Pipelines",
    "GitHub Actions",
    "Travis CI",
    "PHP",
    "Wordpress",
    "Redux Toolkit",
    "React Query",
    "TRPC",
    "Vercel",
    "Sendgrid",
    "Slack API",
    "Twilio",
    "C",
    "Apollo",
    "GCP Text-to-Speech",
    "GCP Speech Synthesis",
    "AWS Textract",
    "Terraform",
    "ES6",
    "ES2023",
    "Microsoft SQL Server",
    "AWS SNS",
    "Tailwind",
    "Bootstrap",
    "Docker",
    "Bun",
    "Figma",
    "Redis",
    "Apache Kafka",
    "Apache Cassandra",
    "Discord API",
    "Open AI API",
    "Vite",
    "Webpack",
    "Upstash",
    "Electron",
    "Tauri",
    "Proton",
    "Express",
    "Sentiment Analysis",
    "Answering Machine Detection ML",
    "Meteor.js",
    "Haskell",
    "Prisma",
    "Expo",
    "EAS (Expo Application Services)"
];

technologies = [...(new Set(technologies))]

const input = document.getElementById("technologies-input");
const cloud = document.getElementById("technologies-cloud");

// on document load
cloud.innerHTML = technologies.map(t => `
<div class="cloud-item" data-tech="${t}">${t}</div>
`).join("")


const cloudItems = document.querySelectorAll('.cloud-item');
console.log(cloudItems)

input.addEventListener('keyup', (event) => {
    const text = document.getElementById("technologies-input").value;
    console.log(text)


    if (text.trim() === "") {
        cloudItems.forEach(c => {
            c.classList.remove("hide-tag")
        });
        return;
    }

    cloudItems.forEach(c => {
        if (!(new RegExp(`.*${text.toLowerCase()}.*`, 'ig').test(c.innerText))) {
            c.classList.add("hide-tag")
        } else {
            c.classList.remove("hide-tag")
        }
    })
})