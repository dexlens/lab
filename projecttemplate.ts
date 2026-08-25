// deno/main.ts

// Define the array of objects with data to fill in the template
const projects = [
  {
    repo_url: "https://github.com/example1/repo",
    website_url: "https://example1.com",
    x_url: "https://x.com/example1",
    telegram_url: "https://t.me/example1",
    etherscan_url: "https://etherscan.io/address/example1",
    project_name: "Example Project 1",
    project_description: "A description for Example Project 1.",
    someadditional_info: "Some additional info for Project 1"
  },
  {
    repo_url: "https://github.com/example2/repo",
    website_url: "https://example2.com",
    x_url: "https://x.com/example2",
    telegram_url: "https://t.me/example2",
    etherscan_url: "https://etherscan.io/address/example2",
    project_name: "Example Project 2",
    project_description: "A description for Example Project 2.",
    someadditional_info: "Some additional info for Project 2"
  }
  // Add more objects as needed
];

// Read the template from template.md
const template = await Deno.readTextFile("deno/template.md");

// Function to fill the template with data from a project object
function fillTemplate(template: string, data: Record<string, string>): string {
  // Match {{ some_key }} and replace with the value from 'data'
  return template.replace(/{{\s*(\w+)\s*}}/g, (_, key) => {
    return key in data ? data[key] : "";
  });
}

// For each project, generate a file
for (const [i, project] of projects.entries()) {
  const output = fillTemplate(template, project);
  // change the output filename as needed, e.g. project1.md, project2.md, etc.
  const outPath = `deno/output_${i + 1}.md`;
  await Deno.writeTextFile(outPath, output);
  console.log(`Generated: ${outPath}`);
}
