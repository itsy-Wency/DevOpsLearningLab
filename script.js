const modules = [
 {id:'git',icon:'⑂',title:'Git and GitHub Workflow',desc:'Track code, create branches, collaborate, and publish changes.',outcome:'TLO53',lesson:{intro:'Git is a distributed version control system. It records project history so developers can understand, compare, and recover changes. GitHub hosts remote repositories and adds collaboration features such as pull requests, reviews, and issue tracking.',why:'A team building a student portal needs to work on different features without overwriting one another. Git provides a history of changes; branches isolate work; GitHub makes collaboration visible and reviewable.',concepts:['Repository: project files plus Git history.','Working directory: files currently being edited.','Staging area: selected changes for the next commit.','Commit: a saved snapshot with a message.','Branch: an independent line of development.','Remote: a hosted repository such as GitHub, commonly named origin.','Pull request: a proposal to merge reviewed changes.'],commands:'git init -b main     # initialize a repository\ngit status           # inspect changed files\ngit add .            # stage current changes\ngit commit -m \"message\"  # save staged changes\ngit switch -c feature/name # create and switch branch\ngit remote add origin URL  # connect remote\ngit push -u origin main    # publish branch\ngit pull             # integrate remote changes',tip:'Commit small, logical changes. Before committing, inspect git status and review what will be included. Never commit passwords or .env files.'},tasks:[
 {title:'Start version control',scenario:'You joined a team developing a Student Portal. The project folder is ready, but Git is not tracking it yet. Initialize a repository and use main as the primary branch.',goal:'Initialize a Git repository with the branch named main.',accept:/^git\s+init\s+-b\s+main$/i,success:'Initialized an empty Git repository. The primary branch is main.',hint:'Use git init with the -b option to set the initial branch name.',explain:'git init creates the hidden .git directory that stores repository metadata and history. The -b main option names the initial branch main.'},
 {title:'Stage project files',scenario:'You created README.md and app files. Git sees them as untracked. Prepare all current files for the next commit.',goal:'Stage all current changes.',accept:/^git\s+add\s+\.$/i,success:'All current project changes have been staged.',hint:'Use git add followed by a dot to stage files in the current directory.',explain:'git add . stages current changes. Staging lets you choose what enters the next commit.'},
 {title:'Create the first commit',scenario:'The project files are staged. Save this snapshot with a meaningful message describing the initial project setup.',goal:'Create a commit with message Initial student portal setup.',accept:/^git\s+commit\s+-m\s+["']Initial student portal setup["']$/i,success:'[main 1a2b3c4] Initial student portal setup. Commit created.',hint:'Use git commit -m followed by the message in quotes.',explain:'A commit records staged changes in local repository history. A clear message describes the intent of the change.'},
 {title:'Create a feature branch',scenario:'You must add a student search feature without directly changing main. Create and switch to a branch named feature/student-search.',goal:'Create and switch to feature/student-search.',accept:/^git\s+switch\s+-c\s+feature\/student-search$/i,success:'Switched to a new branch feature/student-search.',hint:'Use git switch -c followed by the branch name.',explain:'A feature branch isolates work from the stable main branch. The team can review it before merging.'}
 ]},
 {id:'env',icon:'⚙',title:'Environment Configuration (.env)',desc:'Separate configuration from code and protect credentials.',outcome:'TLO55',lesson:{intro:'Applications need settings that vary by environment. A local development database is usually different from a production database. Environment variables let the same application code run with different configuration values.',why:'A developer should not edit source code every time the app moves from a laptop to staging or production. Configuration belongs outside application logic. A local .env file is convenient, but production secrets should be stored in a secure hosting or secret-management service.',concepts:['Environment variable: a named value provided to a running process.',' .env: a local file format commonly loaded by frameworks or dotenv libraries.',' .env.example: a safe template documenting required keys.','Secret: a credential or token that grants access.','.gitignore: prevents selected untracked files from being added to Git.','Never assume that creating a .env file automatically loads it; the framework must support it.'],commands:'# Example .env keys\nAPP_ENV=local\nAPP_DEBUG=true\nDB_HOST=127.0.0.1\nDB_NAME=student_portal\nDB_USER=app_user\nDB_PASSWORD=local-password\n\n# .gitignore entries\n.env\n.env.*\n!.env.example',tip:'If a credential is committed or exposed, treat it as compromised. Revoke or rotate it; deleting the line in a later commit does not erase repository history.'},tasks:[
 {title:'Protect local settings',scenario:'Your project contains a local .env file with database credentials. Add the correct entry to .gitignore so the file is not accidentally committed.',goal:'Enter the .gitignore rule that excludes .env.',accept:/^\.env$/i,success:'Rule added to the simulated .gitignore. Local environment file is now ignored.',hint:'The ignore pattern for a file named .env is simply .env.',explain:'.gitignore tells Git which untracked files to ignore. It does not untrack a file that was already committed.'},
 {title:'Create a safe template',scenario:'New developers need to know which environment variables are required, but must not receive your real password. Create a template file named .env.example.',goal:'Create the template file using the terminal command.',accept:/^(touch|New-Item)\s+\.env\.example$/i,success:'Created .env.example. Add placeholder keys, not real credentials.',hint:'On a Unix-like terminal use touch. In PowerShell, New-Item can create a file.',explain:'.env.example documents the configuration keys a developer must provide. It should contain placeholders, never production secrets.'},
 {title:'Set a local environment value',scenario:'For local development, the application should run in local mode. Set APP_ENV to local in the simulated terminal.',goal:'Set APP_ENV=local.',accept:/^(export\s+APP_ENV=local|\$env:APP_ENV\s*=\s*["']?local["']?)$/i,success:'APP_ENV is now set to local for this simulated session.',hint:'Bash uses export KEY=value. PowerShell uses $env:KEY=\"value\".',explain:'Environment variables are values supplied to a process. Syntax differs between shells; the application must read the variable.'},
 {title:'Identify a leaked secret',scenario:'A teammate accidentally pushed a production API key to a public repository. What is the correct immediate response? Enter the safest first action as a command-like action.',goal:'Revoke or rotate the exposed credential.',accept:/^(rotate|revoke)\s+(the\s+)?(exposed\s+)?(api\s+)?key$/i,success:'Correct. The exposed credential is revoked/rotated. Next, remove it from source and review access logs.',hint:'Deleting the key from the latest file is not enough. Disable the exposed credential first.',explain:'Anyone may have copied a public secret. Revoke or rotate it immediately, then remove it from code/history where feasible and investigate potential use.'}
 ]},
 {id:'deploy',icon:'⇧',title:'Deployment Concepts',desc:'Understand environments, releases, deployment workflow, and rollback.',outcome:'TLO52',lesson:{intro:'Deployment is the process of making a particular application version available in a target environment. It includes preparing a build, supplying configuration, releasing the artifact, starting services, and verifying that the application works.',why:'A website that works on a developer laptop is not automatically ready for users. Production has real traffic, real data, security requirements, and uptime expectations. A repeatable deployment process reduces manual errors.',concepts:['Development: where developers build and experiment.','Testing/QA: where features and regressions are checked.','Staging: production-like environment for final validation.','Production: environment used by real users.','Build: turn source code into a deployable artifact.','Release: identify/approve a version for users.','Deploy: install or activate the release in an environment.','Rollback: restore a previous known-good version.'],commands:'# Example workflow vocabulary\ngit status\ngit tag v1.0.0\ngit push origin v1.0.0\n\n# Deployment verification examples\ncurl -I https://your-domain.example\n# inspect application logs using your host tooling',tip:'Deploy the same tested artifact to the next environment where possible. Keep a known-good previous release so recovery is possible.'},tasks:[
 {title:'Identify the correct environment',scenario:'A new feature passed developer tests. The team wants a production-like environment for final checks before real users see it. Choose the environment name.',goal:'Enter staging.',accept:/^staging$/i,success:'Correct. Staging is the production-like validation environment.',hint:'It is the environment between testing and production.',explain:'Staging should resemble production closely enough to reveal configuration and integration issues before release.'},
 {title:'Create a release tag',scenario:'The team approved version 1.0.0. Create a Git tag to identify this release in repository history.',goal:'Create tag v1.0.0.',accept:/^git\s+tag\s+v1\.0\.0$/i,success:'Release tag v1.0.0 created.',hint:'Use git tag followed by the version label.',explain:'A version tag identifies a particular commit as a release. Teams can trace which code was deployed.'},
 {title:'Publish the release tag',scenario:'The release tag exists locally. Publish that tag to the remote repository so the release is visible to the team.',goal:'Push the v1.0.0 tag to origin.',accept:/^git\s+push\s+origin\s+v1\.0\.0$/i,success:'Tag v1.0.0 pushed to origin.',hint:'Push the remote name and the tag name.',explain:'Pushing a tag shares the release marker with the remote repository.'},
 {title:'Choose a recovery action',scenario:'The latest deployment causes login failures for users. A previous version worked correctly. What is the safest immediate release action?',goal:'Rollback to the previous known-good release.',accept:/^(rollback|roll\s+back)(\s+to\s+the)?\s+(previous|last|known-good)\s+(release|version)$/i,success:'Rollback selected. Restore the previous known-good artifact, then investigate the faulty release.',hint:'Restore the prior working version rather than continuing to serve a broken release.',explain:'Rollback reduces user impact while the team investigates. Database changes may require a separate recovery plan.'}
 ]},
 {id:'docker',icon:'▣',title:'Docker and Containerization',desc:'Build images, run containers, map ports, inspect logs, and use volumes.',outcome:'TLO54',lesson:{intro:'Docker is a platform for packaging and running applications in containers. An image is a template; a container is a running instance of that image. A Dockerfile describes how to build an image.',why:'Different computers may have different runtime versions and dependencies. Containers help standardize the application runtime across development, testing, and production. Containers are not full virtual machines and share the host operating-system kernel.',concepts:['Image: immutable template used to create containers.','Container: isolated running process created from an image.','Dockerfile: instructions for building an image.','Registry: stores and distributes images.','Port mapping: connects a host port to a container port.','Volume: persistent storage managed by Docker.','Compose: defines multi-container applications in YAML.'],commands:'docker --version\ndocker pull nginx\ndocker images\ndocker run --name web -d -p 8080:80 nginx\ndocker ps\ndocker logs web\ndocker stop web\ndocker rm web\n\ndocker build -t my-app:1.0 .',tip:'The -p HOST:CONTAINER option publishes a container port on the host. EXPOSE in a Dockerfile documents a port; it does not publish it by itself.'},tasks:[
 {title:'Download a web server image',scenario:'You need the official Nginx image before starting a web server container. Download the image from the configured registry.',goal:'Pull the nginx image.',accept:/^docker\s+pull\s+nginx$/i,success:'Downloaded nginx image (simulated).',hint:'Use docker pull followed by the image name.',explain:'docker pull downloads an image from a registry to the local Docker image cache.'},
 {title:'Start a container with port mapping',scenario:'Run Nginx in the background. Name the container web-lab and map host port 8080 to container port 80.',goal:'Run the nginx image detached with the requested name and port mapping.',accept:/^docker\s+run\s+--name\s+web-lab\s+-d\s+-p\s+8080:80\s+nginx$/i,success:'Container web-lab started. Open http://localhost:8080 in a real Docker environment.',hint:'Use docker run --name NAME -d -p HOST:CONTAINER IMAGE.',explain:'-d runs in the background. -p 8080:80 maps host port 8080 to port 80 inside the container.'},
 {title:'Inspect running containers',scenario:'The web server is running. List currently running containers to confirm its status.',goal:'List running containers.',accept:/^docker\s+ps$/i,success:'CONTAINER ID   IMAGE   COMMAND   STATUS   PORTS   NAMES\\nweb-lab        nginx   nginx     Up        8080->80 web-lab',hint:'Use docker ps to list running containers.',explain:'docker ps displays running containers. Add -a to include stopped containers.'},
 {title:'Read container logs',scenario:'The application is not responding as expected. Inspect the web-lab container logs to look for startup messages or errors.',goal:'Display logs for web-lab.',accept:/^docker\s+logs\s+web-lab$/i,success:'2026/11/15 [notice] nginx started. No simulated startup errors found.',hint:'Use docker logs followed by the container name.',explain:'docker logs displays output from the container process. Logs are a first troubleshooting step.'}
 ]},
 {id:'cicd',icon:'⟳',title:'CI/CD and GitHub Actions',desc:'Understand automated build, test, package, and deployment pipelines.',outcome:'TLO54',lesson:{intro:'Continuous Integration (CI) means integrating code changes frequently and using automated builds and tests to provide fast feedback. Continuous Delivery keeps changes deployable, often with a human approval before production. Continuous Deployment automatically deploys every qualifying change to production.',why:'A manual process can forget a test or deploy the wrong files. A CI/CD pipeline makes repeatable checks visible and reduces repetitive release work. Automation does not replace code review or operational judgment.',concepts:['Workflow: automation defined in a YAML file.','Event: trigger such as push or pull_request.','Job: group of steps executed on a runner.','Runner: machine that runs the job.','Step: shell command or reusable action.','Artifact: output produced by a build.','Secret: protected value available to an authorized workflow.'],commands:'Typical GitHub Actions sequence:\n1. actions/checkout — get repository source\n2. setup runtime — install/select Node, .NET, etc.\n3. install dependencies — restore packages\n4. run tests — verify behavior\n5. build — create deployable output\n6. publish artifact/image\n7. deploy after required checks/approval',tip:'Store workflow files in .github/workflows/. Never hard-code deployment tokens in YAML. Use protected GitHub Actions secrets and environment rules.'},tasks:[
 {title:'Locate the workflow folder',scenario:'GitHub Actions only discovers workflow YAML files in the repository path .github/workflows/. Enter the command to create this directory in a Unix-like terminal.',goal:'Create .github/workflows directory.',accept:/^mkdir\s+-p\s+\.github\/workflows$/i,success:'Created .github/workflows. Workflow YAML files can be added here.',hint:'Use mkdir -p to create a directory path including missing parent folders.',explain:'GitHub Actions reads workflow definitions from .github/workflows in the repository root.'},
 {title:'Create a CI workflow file',scenario:'Create a workflow file named ci.yml inside .github/workflows. Use a file creation command.',goal:'Create .github/workflows/ci.yml.',accept:/^(touch|New-Item)\s+\.github\/workflows\/ci\.yml$/i,success:'Created .github/workflows/ci.yml. Add a workflow definition with triggers, jobs, and steps.',hint:'Use touch in Bash or New-Item in PowerShell with the full path.',explain:'A workflow is a YAML file stored in .github/workflows. It defines events, jobs, and steps.'},
 {title:'Identify the CI trigger',scenario:'You want the CI workflow to run when code is pushed to main. Enter the correct GitHub Actions event key.',goal:'Enter push.',accept:/^push$/i,success:'Correct. The push event can trigger a workflow when commits are pushed.',hint:'It is the event name used under the workflow on: section.',explain:'The push event starts a workflow when a commit is pushed to the repository. Branch filters can limit which branches trigger it.'},
 {title:'Use a protected deployment secret',scenario:'A workflow needs a deployment token stored in repository or environment secrets. Enter the GitHub Actions expression that references DEPLOY_TOKEN.',goal:'Reference secrets.DEPLOY_TOKEN.',accept:/^\$\{\{\s*secrets\.DEPLOY_TOKEN\s*\}\}$/i,success:'Correct. The workflow references the protected secret without hard-coding its value.',hint:'GitHub Actions expressions use ${{ ... }} and the secrets context.',explain:'Secrets should be stored in GitHub settings and referenced through the secrets context. Do not echo or expose the value in logs.'}
 ]},
 {id:'production',icon:'♢',title:'Production Best Practices',desc:'Prepare secure, observable, recoverable applications for real users.',outcome:'TLO55',lesson:{intro:'Production is the live environment used by real users. A production-ready application needs more than a successful start: it needs secure configuration, controlled access, monitoring, backups, tested recovery, and a plan for updates.',why:'A production incident can expose customer data, interrupt services, or cause data loss. Good operational practices reduce the likelihood and impact of incidents.',concepts:['Security: HTTPS, authentication, authorization, validation, least privilege.','Observability: logs, metrics, traces, health checks, and alerts.','Backup: a recoverable copy of data; restoration must be tested.','Migration: a controlled database schema change.','Rollback: return to a known-good application version.','Patch management: update vulnerable dependencies and runtime images.','Least privilege: give each account only the permissions it needs.'],commands:'# Example checks (adapt to your hosting platform)\ncurl -I https://your-domain.example\n\ndocker ps\ndocker logs app-container\n\ndocker image ls\n\n# Example: inspect recent service logs\n# Use your host or cloud provider logging tools',tip:'A backup is only useful if it can be restored. Schedule backups, protect them, and test restoration procedures.'},tasks:[
 {title:'Secure production traffic',scenario:'Your production website currently accepts plain HTTP. What protocol should be enabled to encrypt traffic between browsers and the server?',goal:'Enter HTTPS.',accept:/^https$/i,success:'Correct. HTTPS protects data in transit using TLS.',hint:'It is HTTP secured with TLS.',explain:'HTTPS encrypts traffic and helps protect credentials, sessions, and other data in transit.'},
 {title:'Apply least privilege',scenario:'An application database account has full administrative permissions, although the application only needs to read and write its own tables. Name the security principle to apply.',goal:'Enter least privilege.',accept:/^least\s+privilege$/i,success:'Correct. Grant only the permissions the application requires.',hint:'This principle limits each account to the minimum required access.',explain:'Least privilege reduces the damage that can occur if an account or application is compromised.'},
 {title:'Verify application health',scenario:'After deployment, the team needs a lightweight endpoint to check whether the application is responding. What is this commonly called?',goal:'Enter health check.',accept:/^health\s*check$/i,success:'Correct. A health check helps verify service availability or readiness.',hint:'It is a small endpoint or probe used by monitoring and orchestration systems.',explain:'Health checks help load balancers and operators identify unhealthy instances. Liveness and readiness checks may serve different purposes.'},
 {title:'Plan recovery',scenario:'Your database backup job has been running for months, but nobody has tested whether the backup can be restored. What should the team do?',goal:'Test restoring the backup.',accept:/^(test|perform)\s+(a\s+)?(backup\s+)?restore(\s+test)?$/i,success:'Correct. Perform a restore test and document the recovery procedure.',hint:'A successful backup job does not prove that the data can be recovered.',explain:'Regular restore tests validate backup integrity, permissions, recovery time, and the actual recovery procedure.'}
 ]},
 {id:'capstone',icon:'★',title:'Complete Deployment Challenge',desc:'Combine the workflow into a realistic end-to-end release task.',outcome:'TLO52–TLO55',lesson:{intro:'This capstone combines the course topics. Imagine a small team releasing a Student Portal update. The team must track its code, protect environment configuration, prepare a container, validate changes, and release safely.',why:'Real-world DevOps work is a connected sequence. A correct command in isolation is not enough; students must understand why each step happens and how it affects the next stage.',concepts:['Version control protects project history.','Environment configuration separates code from deployment-specific settings.','Docker packages the application.','CI validates each change automatically.','A release is deployed to staging before production.','Monitoring and rollback reduce operational risk.'],commands:'Suggested high-level sequence:\nGit branch → commit → push → PR/review\n.env.example + secret management\nDockerfile → docker build → docker run\nCI workflow → test → build → publish\nStaging verification → production approval\nHealth check → monitor → rollback if needed',tip:'Read the scenario carefully. The best solution is not merely a command that works; it is a safe, repeatable workflow.'},tasks:[
 {title:'Create a release branch',scenario:'Start the release preparation from the stable main branch. Create a branch named release/v1.0.0.',goal:'Create and switch to release/v1.0.0.',accept:/^git\s+switch\s+-c\s+release\/v1\.0\.0$/i,success:'Release branch created. Changes can now be prepared for version 1.0.0.',hint:'Use git switch -c with the release branch name.',explain:'A release branch isolates stabilization work for a particular version.'},
 {title:'Build the container image',scenario:'The Dockerfile is ready. Build an image tagged student-portal:1.0.0 from the current project directory.',goal:'Build the image with the exact name and tag.',accept:/^docker\s+build\s+-t\s+student-portal:1\.0\.0\s+\.$/i,success:'Successfully built student-portal:1.0.0 (simulated).',hint:'Use docker build -t IMAGE:TAG followed by a dot for the current build context.',explain:'The image tag identifies the application artifact and version. The dot supplies the current directory as the build context.'},
 {title:'Run the staging container',scenario:'Start the student portal image in detached mode, name the container student-portal-stage, and map host port 8080 to container port 3000.',goal:'Run the image with the required name, detached flag, and port mapping.',accept:/^docker\s+run\s+--name\s+student-portal-stage\s+-d\s+-p\s+8080:3000\s+student-portal:1\.0\.0$/i,success:'Staging container started. Validate the app on the staging endpoint.',hint:'Use docker run --name NAME -d -p HOST:CONTAINER IMAGE:TAG.',explain:'This maps external host port 8080 to the application listening on port 3000 inside the container.'},
 {title:'Verify the release endpoint',scenario:'The staging deployment is running. Perform a simple HTTP header request to check the staging endpoint at localhost port 8080.',goal:'Run curl -I http://localhost:8080.',accept:/^curl\s+-I\s+http:\/\/localhost:8080\/?$/i,success:'HTTP/1.1 200 OK (simulated). Staging endpoint responds.',hint:'Use curl -I followed by the staging URL.',explain:'A header request is a quick smoke check. It does not replace functional tests, security checks, or user journey validation.'}
 ]}
];

// All answer records and progress are stored in JavaScript arrays only.
let state = {};                 // completed challenge indexes by module
let studentAnswers = [];        // every submitted answer and validation result
let completedChallenges = [];   // completed module/challenge pairs
let currentModule = null, taskIndex=0, activeTab='lesson', history=[];
const totalTasks = modules.reduce((n,m)=>n+m.tasks.length,0);
function save(){updateProgress()}
function completed(m,i){return !!(state[m.id]&&state[m.id].includes(i))}
function markDone(m,i){
 if(!state[m.id])state[m.id]=[];
 if(!state[m.id].includes(i))state[m.id].push(i);
 if(!completedChallenges.some(x=>x.moduleId===m.id && x.challengeIndex===i)){
   completedChallenges.push({moduleId:m.id,challengeIndex:i});
 }
 save();
}
function countDone(){return modules.reduce((n,m)=>n+(state[m.id]?.length||0),0)}
function updateProgress(){let n=countDone(),pct=Math.round(n/totalTasks*100);document.getElementById('topProgress').textContent=pct+'% completed';document.getElementById('sidePct').textContent=pct+'%';document.getElementById('sideBar').style.width=pct+'%';document.getElementById('sideCount').textContent=n+' of '+totalTasks+' challenges completed'}
function buildNav(){document.getElementById('sideModules').innerHTML=modules.map(m=>`<button class="navbtn" onclick="openModule('${m.id}')"><span class="navicon">${m.icon}</span><span style="flex:1">${m.title}</span><span style="font-size:10px;color:#a58ab9">${state[m.id]?.length||0}/${m.tasks.length}</span></button>`).join('')}
function showHome(){
 currentModule=null;document.getElementById('navHome').classList.add('active');
 let done=countDone(),pct=Math.round(done/totalTasks*100);
 document.getElementById('main').innerHTML=`
 <section class="hero"><div class="hero-orb orb-one"></div><div class="hero-orb orb-two"></div><div><div style="font-size:10px;letter-spacing:1.4px;font-weight:800;color:#e7c9ff;margin-bottom:9px">INTERACTIVE COURSE</div><h1>Learn DevOps by doing.</h1><p>Explore deployment and DevOps fundamentals, then solve practical scenarios using a simulated command-line terminal. Learn the purpose behind every command—not just the syntax.</p></div><div class="hero-stat"><strong>${pct}%</strong><span>COURSE COMPLETED</span></div></section>
 <div class="sectionhead"><div><h2>Your learning modules</h2><p>Seven learning areas plus an end-to-end deployment capstone.</p></div><span class="pill">${done}/${totalTasks} tasks complete</span></div>
 <div class="modulegrid">${modules.map((m,i)=>{let d=state[m.id]?.length||0;return `<button class="modulecard" onclick="openModule('${m.id}')"><div class="modtop"><div class="modicon">${m.icon}</div><span class="tag">${m.outcome}</span></div><h3>${i+1}. ${m.title}</h3><p>${m.desc}</p><div style="display:flex;justify-content:space-between;font-size:10px;color:#968aa2;margin-bottom:6px"><span>${d} of ${m.tasks.length} challenges</span><span>${Math.round(d/m.tasks.length*100)}%</span></div><div class="mini-progress"><span style="width:${d/m.tasks.length*100}%"></span></div></button>`}).join('')}</div>
 <div class="sectionhead"><div><h2>How the lab works</h2><p>Every challenge follows the same learning cycle.</p></div></div>
 <div class="modulegrid" style="grid-template-columns:repeat(3,minmax(0,1fr))">
 <div class="panel" style="padding:16px"><div class="modicon">01</div><h3>Read the scenario</h3><p style="font-size:12px;color:var(--muted)">Understand the real-world situation, task, and expected outcome.</p></div>
 <div class="panel" style="padding:16px"><div class="modicon">02</div><h3>Enter a command</h3><p style="font-size:12px;color:var(--muted)">Use the built-in terminal to submit a command or answer the task.</p></div>
 <div class="panel" style="padding:16px"><div class="modicon">03</div><h3>Get validated</h3><p style="font-size:12px;color:var(--muted)">Receive immediate feedback, explanation, and progress credit.</p></div></div>
 <p class="footer-note"> Student answers and progress are held in JavaScript arrays in the current browser session; refreshing the page clears them.</p>`;
 buildNav();updateProgress()
}
function openModule(id,idx=0){
 currentModule=modules.find(m=>m.id===id);
 taskIndex=Math.min(idx,currentModule.tasks.length-1);
 activeTab='learn';
 currentView='list';
 document.getElementById('navHome').classList.remove('active');
 buildNav();
 renderModule();
}
let currentView='list';
function openChallenge(idx){
 taskIndex=idx;
 currentView='terminal';
 renderModule();
}
function renderModule(){
 const m=currentModule,t=m.tasks[taskIndex],done=completed(m,taskIndex);
 const main=document.getElementById('main');
 const tabs=`<div class="module-tabs" role="tablist" aria-label="Module sections">
   <button class="module-tab ${activeTab==='learn'?'active':''}" role="tab" aria-selected="${activeTab==='learn'}" onclick="setTab('learn')"><span>◈</span> Learn concepts</button>
   <button class="module-tab ${activeTab==='challenges'?'active':''}" role="tab" aria-selected="${activeTab==='challenges'}" onclick="setTab('challenges')"><span>⌘</span> Challenges <b>${state[m.id]?.length||0}/${m.tasks.length}</b></button>
  </div>`;
 let body='';
 if(activeTab==='learn'){
   body=`<section class="learn-view page-enter">
    <div class="learning-intro">
      <div><div class="eyebrow">MODULE OVERVIEW</div><h2>${m.title}</h2><p>${m.desc}</p></div>
      <div class="learning-count"><strong>${m.tasks.length}</strong><span>hands-on challenges</span></div>
    </div>
    <div class="learn-grid">
      <article class="panel lesson-main"><div class="panelhead"><strong>Understand the concept</strong><span class="tag">VISUAL GUIDE</span></div><div class="panelbody lessoncontent">${renderVisual(m)}
       <div class="eyebrow">CONCEPT BRIEFING</div><h2>${m.title}</h2><p>${m.lesson.intro}</p>
       <h3>Why does this matter in real projects?</h3><p>${m.lesson.why}</p>
       <h3>Key concepts</h3><ul>${m.lesson.concepts.map(x=>`<li>${esc(x)}</li>`).join('')}</ul>
       <div class="callout"><b>Real-world practice:</b> ${esc(m.lesson.tip)}</div>
      </div></article>
      <aside class="learn-aside">
       <div class="panel"><div class="panelhead"><strong>Command guide</strong><span class="tag">QUICK REFERENCE</span></div><div class="panelbody"><p class="aside-copy">Commands you will encounter in this module.</p><div class="codehint">${esc(m.lesson.commands)}</div></div></div>
       <div class="next-card"><div class="next-icon">✦</div><div><b>Ready to practice?</b><p>Apply what you learned in a real-world scenario.</p></div><button class="primary" onclick="setTab('challenges')">View challenges →</button></div>
      </aside>
    </div>
   </section>`;
 } else if(currentView==='terminal'){
   body=`<section class="challenge-workspace page-enter">
    <div class="challenge-toolbar"><button class="backbtn" onclick="backToChallenges()">← All challenges</button><div class="challenge-step">CHALLENGE ${taskIndex+1} <span>/ ${m.tasks.length}</span></div></div>
    <div class="split">
     <section class="panel scenario-panel"><div class="panelhead"><strong>Mission briefing</strong><span class="tag">${m.outcome}</span></div><div class="panelbody lessoncontent">
      <div class="eyebrow">YOUR SCENARIO</div><h2>${t.title}</h2><p>${t.scenario}</p>
      <div class="taskbox"><h3>Mission objective</h3><p>${t.goal}</p><div class="taskmeta"><span>${done?'Completed':'In progress'}</span><span>Challenge ${taskIndex+1}/${m.tasks.length}</span></div></div>
      <div class="callout"><b>Remember:</b> Enter the command in the terminal exactly as required. You can use the Hint button if you need guidance.</div>
      <div class="challenge-progress"><div class="progressline"><span style="width:${(state[m.id]?.length||0)/m.tasks.length*100}%"></span></div><small>${state[m.id]?.length||0} of ${m.tasks.length} challenges completed in this module</small></div>
     </div></section>
     <section class="panel terminal"><div class="termhead"><div style="display:flex;align-items:center;gap:11px"><div class="dots"><i></i><i></i><i></i></div><small>DEVOPS LAB TERMINAL</small></div><div class="termtools"><button onclick="clearTerminal()">Clear</button><button onclick="showHelp()">Help</button></div></div><div class="termstatus"><span>student@learning-lab:~/${m.id}</span><span id="attemptCount">ARRAY-STORED ANSWERS · ${studentAnswers.length} ATTEMPTS</span></div><div class="terminal-output" id="terminalOutput"><div class="line mutedline">Welcome to the DevOps Learning Lab terminal.</div><div class="line mutedline">Try a command to complete the mission.</div><div class="line mutedline">Your mission starts here. Enter your command below.</div></div><div class="terminal-inputrow"><span class="promptlabel">$</span><input id="terminalInput" class="terminal-input" placeholder="Enter the command to solve this task..." autocomplete="off" spellcheck="false" onkeydown="if(event.key==='Enter')submitCommand()"><button class="runbtn" onclick="submitCommand()">RUN ↵</button></div><div class="taskfooter"><span id="taskProgress">${done?'Challenge completed':'Waiting for command'}</span><div style="display:flex;gap:7px"><button class="hintbtn" onclick="showHint()">Hint</button><button class="hintbtn" onclick="nextTask()" id="nextBtn" ${done?'':'disabled'} style="${done?'background:#315c4b;color:#a8f2ce':'opacity:.4;cursor:not-allowed'}">Next task →</button></div></div></section>
    </div>
   </section>`;
 } else {
   body=`<section class="challenge-list-view page-enter">
    <div class="challenge-list-intro"><div><div class="eyebrow">PRACTICE & APPLY</div><h2>Challenge your understanding</h2><p>Complete each scenario by entering the correct command in the built-in terminal.</p></div><div class="list-progress"><strong>${state[m.id]?.length||0}<small>/${m.tasks.length}</small></strong><span>completed</span></div></div>
    <div class="challenge-cards">${m.tasks.map((x,i)=>{let isDone=completed(m,i);return `<article class="challenge-card ${isDone?'is-done':''}">
      <div class="challenge-number">${isDone?'✓':String(i+1).padStart(2,'0')}</div>
      <div class="challenge-card-copy"><div class="challenge-card-meta"><span>${isDone?'COMPLETED':'PRACTICAL TASK'}</span><span>·</span><span>${m.outcome}</span></div><h3>${x.title}</h3><p>${x.scenario}</p><div class="challenge-goal"><b>Objective:</b> ${x.goal}</div></div>
      <button class="${isDone?'secondary':'primary'} challenge-start" onclick="openChallenge(${i})">${isDone?'Review task':'Start challenge'} →</button>
    </article>`}).join('')}</div>
   </section>`;
 }
 main.innerHTML=`<div class="lessonhead"><div class="lesson-title"><div class="eyebrow">DEPLOYMENT & DEVOPS</div><h1>${m.title}</h1><p>${m.outcome} · ${m.tasks.length} practical challenges</p></div><button class="backbtn" onclick="showHome()">← Dashboard</button></div>${tabs}${body}`;
 updateProgress();
 if(currentView==='terminal')focusInput();
}
function backToChallenges(){currentView='list';activeTab='challenges';renderModule()}
function renderVisual(m){
 const common = `role="img" aria-label="Concept visualization for ${m.title}"`;
 const card = (title,sub,x,y,fill="#f3eafb",stroke="#c9a8e8",color="#57347b") =>
 `<g><rect x="${x}" y="${y}" width="142" height="66" rx="12" fill="${fill}" stroke="${stroke}"/><text x="${x+71}" y="${y+27}" text-anchor="middle" font-size="12" font-weight="700" fill="${color}">${title}</text><text x="${x+71}" y="${y+45}" text-anchor="middle" font-size="9" fill="${color}">${sub}</text></g>`;
 const arrow = (x1,y1,x2,y2) => `<path d="M${x1} ${y1} L${x2} ${y2}" stroke="#9d7ac0" stroke-width="2.5" fill="none" marker-end="url(#arr)"/>`;
 let svg = '';
 let caption = '';
 if(m.id==='git'){
  svg = `<svg viewBox="0 0 620 210" ${common}><defs><marker id="arr" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6" fill="#9d7ac0"/></marker></defs>
  ${card('Working folder','edit files',15,20)}${card('Staging area','git add',175,20,'#fff0f7','#efb3d1','#8c3c68')}${card('Commit history','git commit',335,20,'#f1eaff','#c9a8e8','#57347b')}${card('GitHub remote','git push',495,20,'#e9f8f2','#a8dec7','#28674d')}
  ${arrow(157,53,172,53)}${arrow(317,53,332,53)}${arrow(477,53,492,53)}
  <path d="M406 96 V130 H248 V96" stroke="#dc79ac" stroke-width="2" stroke-dasharray="5 4" fill="none"/><path d="M248 96 L242 106 L254 106" fill="none" stroke="#dc79ac" stroke-width="2"/>
  <text x="327" y="151" text-anchor="middle" font-size="11" fill="#8c4770">Branch / review / merge workflow</text>
  <text x="310" y="188" text-anchor="middle" font-size="10" fill="#756b85">Git records versions locally; GitHub hosts the shared repository.</text></svg>`;
  caption = 'Think of Git as a save-history system: stage the exact changes, commit a snapshot, then push it to the shared remote.';
 } else if(m.id==='env'){
  svg = `<svg viewBox="0 0 620 220" ${common}><defs><marker id="arr" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6" fill="#9d7ac0"/></marker></defs>
  ${card('Same app code','one codebase',20,18)}${card('.env local','localhost DB',245,18,'#fff0f7','#efb3d1','#8c3c68')}${card('Staging config','test DB',245,91,'#f1eaff','#c9a8e8','#57347b')}${card('Production config','live DB',245,164,'#e9f8f2','#a8dec7','#28674d')}
  ${arrow(164,51,241,51)}<path d="M164 51 H205 V124 H241 M205 124 V197 H241" stroke="#9d7ac0" stroke-width="2" fill="none" marker-end="url(#arr)"/>
  <text x="470" y="78" text-anchor="middle" font-size="11" font-weight="700" fill="#57347b">Secrets stay outside</text><text x="470" y="96" text-anchor="middle" font-size="10" fill="#756b85">source code + Git</text><path d="M470 108 V147" stroke="#dc79ac" stroke-width="2" stroke-dasharray="4 4"/><text x="470" y="164" text-anchor="middle" font-size="10" fill="#8c4770">Use secret manager</text><text x="470" y="179" text-anchor="middle" font-size="10" fill="#8c4770">for production values</text></svg>`;
  caption = 'One codebase can run in several environments. The configuration changes; the application source code should not need hard-coded edits.';
 } else if(m.id==='deploy'){
  svg = `<svg viewBox="0 0 620 190" ${common}><defs><marker id="arr" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6" fill="#9d7ac0"/></marker></defs>
  ${card('Build','package code',8,36)}${card('Test','verify behavior',166,36)}${card('Staging','final checks',324,36,'#fff0f7','#efb3d1','#8c3c68')}${card('Production','real users',482,36,'#e9f8f2','#a8dec7','#28674d')}
  ${arrow(150,69,163,69)}${arrow(308,69,321,69)}${arrow(466,69,479,69)}
  <path d="M553 110 V145 H83 V110" stroke="#dc79ac" stroke-width="2" stroke-dasharray="5 4" fill="none" marker-end="url(#arr)"/><text x="318" y="166" text-anchor="middle" font-size="11" fill="#8c4770">If release fails: rollback to known-good version</text></svg>`;
  caption = 'Deployment is a controlled journey from build to live users. Validate in staging and prepare rollback before production release.';
 } else if(m.id==='docker'){
  svg = `<svg viewBox="0 0 620 220" ${common}><defs><marker id="arr" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6" fill="#9d7ac0"/></marker></defs>
  ${card('Dockerfile','build instructions',15,15)}${card('Docker image','packaged template',239,15,'#fff0f7','#efb3d1','#8c3c68')}${arrow(157,48,235,48)}
  <path d="M310 82 V108 H112 V129 M310 108 H310 V129 M310 108 H508 V129" stroke="#9d7ac0" stroke-width="2" fill="none" marker-end="url(#arr)"/>
  ${card('Container A','running app',40,132,'#e9f8f2','#a8dec7','#28674d')}${card('Container B','test instance',239,132,'#e9f8f2','#a8dec7','#28674d')}${card('Container C','another copy',438,132,'#e9f8f2','#a8dec7','#28674d')}
  <text x="310" y="207" text-anchor="middle" font-size="10" fill="#756b85">One image can create multiple containers.</text></svg>`;
  caption = 'The Dockerfile is the recipe, the image is the packaged template, and each container is a running instance made from that image.';
 } else if(m.id==='cicd'){
  svg = `<svg viewBox="0 0 620 200" ${common}><defs><marker id="arr" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6" fill="#9d7ac0"/></marker></defs>
  ${card('Push / PR','event trigger',5,42)}${card('Checkout','get source',158,42)}${card('Build + test','CI checks',311,42,'#fff0f7','#efb3d1','#8c3c68')}${card('Deploy','delivery',464,42,'#e9f8f2','#a8dec7','#28674d')}
  ${arrow(147,75,155,75)}${arrow(300,75,308,75)}${arrow(453,75,461,75)}
  <rect x="185" y="137" width="250" height="42" rx="10" fill="#f5effb" stroke="#d9c5e9"/><text x="310" y="154" text-anchor="middle" font-size="11" font-weight="700" fill="#57347b">Quality gate</text><text x="310" y="168" text-anchor="middle" font-size="9" fill="#756b85">Tests pass · approval if required</text><path d="M386 109 V127" stroke="#9d7ac0" stroke-width="2" marker-end="url(#arr)"/></svg>`;
  caption = 'A CI/CD pipeline reacts to code changes, checks the project, and can publish or deploy a verified artifact.';
 } else if(m.id==='production'){
  svg = `<svg viewBox="0 0 620 225" ${common}><defs><marker id="arr" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6" fill="#9d7ac0"/></marker></defs>
  ${card('User / browser','HTTPS request',12,74)}${card('Web app','business logic',174,74,'#fff0f7','#efb3d1','#8c3c68')}${card('Database','persistent data',336,74)}${card('Backup','recovery copy',498,74,'#e9f8f2','#a8dec7','#28674d')}
  ${arrow(154,107,171,107)}${arrow(316,107,333,107)}${arrow(478,107,495,107)}
  <rect x="50" y="12" width="520" height="38" rx="10" fill="#f3eafb" stroke="#d8c2ea"/><text x="310" y="36" text-anchor="middle" font-size="12" font-weight="700" fill="#57347b">Production readiness surrounds the whole system</text>
  <text x="310" y="174" text-anchor="middle" font-size="11" fill="#8c4770">Security · Monitoring · Logs · Alerts · Updates</text><text x="310" y="196" text-anchor="middle" font-size="10" fill="#756b85">Backups must be tested with an actual restore procedure.</text></svg>`;
  caption = 'Production is not only the app server. Users, application logic, data, backups, security, and monitoring form one operating system.';
 } else {
  svg = `<svg viewBox="0 0 620 190" ${common}><defs><marker id="arr" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6" fill="#9d7ac0"/></marker></defs>
  ${card('Git','track changes',8,48)}${card('Config','protect secrets',166,48)}${card('Docker','package app',324,48)}${card('CI/CD','test + release',482,48)}
  ${arrow(150,81,163,81)}${arrow(308,81,321,81)}${arrow(466,81,479,81)}
  <text x="310" y="147" text-anchor="middle" font-size="12" font-weight="700" fill="#57347b">Verified application release</text><text x="310" y="166" text-anchor="middle" font-size="10" fill="#756b85">Staging → Production → Monitor → Recover</text></svg>`;
  caption = 'The capstone connects every topic into one repeatable release process.';
 }
 return `<div class="visual-card"><div class="visual-heading"><span>SEE IT IN ACTION</span><span class="visual-chip">Animated visual</span></div><div class="visual-stage">${svg}</div><p>${caption}</p></div>`;
}

function renderLeft(m,t,done){
 if(activeTab==='commands')return `<div class="eyebrow">Command guide</div><h2>Commands and their purpose</h2><p>Use these examples as a reference. The commands are illustrative; the exact command depends on your operating system, project, and environment.</p><div class="codehint">${esc(m.lesson.commands)}</div><div class="callout">${esc(m.lesson.tip)}</div>`;
 if(activeTab==='tasks')return `<div class="eyebrow">Practice sequence</div><h2>Challenges in this module</h2>${m.tasks.map((x,i)=>`<button class="modulecard" style="width:100%;min-height:auto;margin:7px 0;padding:12px;display:flex;align-items:center;gap:10px" onclick="openModule('${m.id}',${i})"><span class="modicon" style="width:30px;height:30px">${completed(m,i)?'✓':i+1}</span><span style="text-align:left;flex:1"><b style="font-size:12px">${x.title}</b><small style="display:block;color:#8a7c98;margin-top:3px">${x.goal}</small></span><span class="tag">${completed(m,i)?'DONE':'START'}</span></button>`).join('')}`;
 return `${renderVisual(m)}<div class="eyebrow">Concept briefing</div><h2>${m.title}</h2><p>${m.lesson.intro}</p><h3>Why does this matter in real projects?</h3><p>${m.lesson.why}</p><h3>Key concepts</h3><ul>${m.lesson.concepts.map(x=>`<li>${esc(x)}</li>`).join('')}</ul><div class="callout"><b>Real-world practice:</b> ${esc(m.lesson.tip)}</div><div class="taskbox"><h3>Scenario ${taskIndex+1}: ${t.title}</h3><p>${t.scenario}</p><div class="taskmeta"><span>${m.outcome}</span><span>${done?'Completed':'Not completed'}</span><span>Challenge ${taskIndex+1}/${m.tasks.length}</span></div><h3 style="margin-top:13px">Your task</h3><p>${t.goal}</p></div>`;
}
function setTab(tab){activeTab=tab;currentView='list';renderModule()}

function addLine(txt,cls=''){let out=document.getElementById('terminalOutput');if(!out)return;let d=document.createElement('div');d.className='line '+cls;d.textContent=txt;out.appendChild(d);out.scrollTop=out.scrollHeight}
function submitCommand(){
 let input=document.getElementById('terminalInput'),cmd=input.value.trim();if(!cmd)return;input.value='';addLine('$ '+cmd,'prompt');
 if(/^help$/i.test(cmd)){showHelp();return}
 if(/^clear$/i.test(cmd)){clearTerminal();return}
 if(/^hint$/i.test(cmd)){showHint();return}
 const m=currentModule,t=m.tasks[taskIndex];
 if(completed(m,taskIndex)){addLine('This challenge is already completed. Select Next task to continue.','warn');return}
 const isCorrect = t.accept.test(cmd);
 studentAnswers.push({
   moduleId: m.id,
   challengeIndex: taskIndex,
   challengeTitle: t.title,
   submittedAnswer: cmd,
   correct: isCorrect,
   submittedAt: new Date().toISOString()
 });
 const attemptLabel = document.getElementById('attemptCount');
 if(attemptLabel) attemptLabel.textContent = 'ARRAY-STORED ANSWERS · '+studentAnswers.length+' ATTEMPTS';
 if(isCorrect){
  markDone(m,taskIndex);addLine(t.success,'good');addLine('WHY THIS WORKS: '+t.explain,'mutedline');addLine('Challenge completed. Progress updated for this session.','good');document.querySelector('.terminal')?.classList.add('success-pulse');setTimeout(()=>document.querySelector('.terminal')?.classList.remove('success-pulse'),900);
  document.getElementById('nextBtn').disabled=false;document.getElementById('nextBtn').style.opacity='1';document.getElementById('nextBtn').style.cursor='pointer';document.getElementById('nextBtn').style.background='#315c4b';document.getElementById('nextBtn').style.color='#a8f2ce';
  document.getElementById('taskProgress').textContent='Challenge completed · '+(state[m.id]?.length||0)+'/'+m.tasks.length+' module tasks';buildNav();updateProgress();
 }else{
  addLine('Command not accepted for this task. Review the objective and try again.','bad');document.querySelector('.terminal')?.classList.add('shake');setTimeout(()=>document.querySelector('.terminal')?.classList.remove('shake'),420);
  addLine('Tip: check spelling, options, spaces, and the required order of arguments.','mutedline');
 }
}
function showHint(){let t=currentModule.tasks[taskIndex];addLine('HINT: '+t.hint,'warn')}
function showHelp(){addLine('Supported terminal actions:','mutedline');addLine('help  — show this help','mutedline');addLine('clear — clear terminal output','mutedline');addLine('hint  — show a hint for the current task','mutedline');addLine('Enter the command requested by the current scenario.','mutedline');addLine('This simulator checks task-specific command patterns; it is not a full shell.','warn')}
function clearTerminal(){let out=document.getElementById('terminalOutput');if(out)out.innerHTML='<div class="line mutedline">Terminal cleared. Current challenge state is unchanged.</div>'}
function focusInput(){setTimeout(()=>document.getElementById('terminalInput')?.focus(),30)}
function nextTask(){if(!completed(currentModule,taskIndex))return;if(taskIndex<currentModule.tasks.length-1){taskIndex++;renderModule()}else{addLine('Module challenges completed. Return to the challenge list or choose another module.','good')}}
function prevTask(){if(taskIndex>0){taskIndex--;renderModule()}}
function showReference(){currentModule=null;document.getElementById('navHome').classList.remove('active');document.getElementById('main').innerHTML=`<div class="lessonhead"><div class="lesson-title"><h1>Command reference</h1><p>Quick reminders for common commands covered in the learning lab.</p></div><button class="backbtn" onclick="showHome()">← Dashboard</button></div><div class="modulegrid">${modules.map(m=>`<div class="panel" style="padding:16px"><div class="modtop"><b style="font-size:13px">${m.title}</b><span class="tag">${m.outcome}</span></div><div class="codehint">${esc(m.lesson.commands)}</div></div>`).join('')}</div><p class="footer-note">Always consult the official documentation for exact syntax and current options.</p>`}
function openReset(){document.getElementById('resetModal').style.display='grid'}
function closeReset(){document.getElementById('resetModal').style.display='none'}
function resetProgress(){state={};studentAnswers=[];completedChallenges=[];save();buildNav();closeReset();showHome()}
function esc(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}

// Classroom presentation setting: suppress the browser context menu on right-click.
// This is a UI restriction only; it is not a security or copy-protection mechanism.
document.addEventListener('contextmenu', function(event){ event.preventDefault(); });

buildNav();showHome();