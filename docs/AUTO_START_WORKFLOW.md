# 🤖 Auto-Start Workflow

**Feature**: AI automatically starts the conversation flow when you open your AI assistant after running `seedfw init`.

**Inspired by**: OpenSpec's AGENTS.md auto-loading pattern

---

## 🎯 What This Means

### **Before (Manual)**:
```bash
seedfw init
# Then you had to:
# 1. Copy project.md.template to project.md
# 2. Edit TECH_STACK.md manually
# 3. Open AI assistant
# 4. Type: /intent-translator
# 5. Answer questions
```

### **After (Automatic)** ⭐:
```bash
seedfw init
# Open AI assistant
# → AI automatically greets you and starts asking questions!
# → AI loads context files automatically
# → AI confirms tech stack with you
# → AI creates all files based on your answers
# → NO manual file editing needed!
```

---

## 🚀 How It Works

### **Step 1: Initialize**
```bash
cd ~/my-project
seedfw init
```

**Output**:
```
✅ SeedFW initialized successfully!

🤖 Next: Open Your AI Assistant
  ✨ The AI will automatically start asking you questions!
     (It reads AGENTS.md and starts the Intent Translator workflow)

  1. Open your AI assistant (Augment, Claude, Cursor, etc.)
  2. The AI will greet you and start asking questions
  3. Answer the questions - the AI will guide you through everything

  💡 No need to type commands or fill files manually!
     The AI will ask about your tech stack and create everything for you.
```

### **Step 2: Open AI Assistant**

Open your AI assistant (Augment, Claude, Cursor, Windsurf, etc.)

### **Step 3: AI Automatically Starts**

The AI reads `AGENTS.md` and automatically:

1. **Greets you**:
   ```
   👋 Welcome to SeedFW! I'm ready to help you build your project.
   
   I'll guide you through a quick setup to understand what you want to build.
   This will take about 5-10 minutes.
   ```

2. **Loads context silently**:
   - Reads `TECH_STACK.md`
   - Reads `GOLDEN_RULES.md`
   - Reads `VERTICAL_SLICE_ARCHITECTURE.md`
   - Reads `project.md` (if exists)
   - Reads `.claude/commands/01-intent-clarification/intent-translator.md`

3. **Asks clarifying questions**:
   - **Q1**: "What do you want to build?"
   - **Q2**: "Who is this for?"
   - **Q3**: "What's the main goal?"

4. **Confirms tech stack**:
   ```
   I see you have a tech stack defined. Let me confirm the key technologies:
   
   - Frontend: React 18, TypeScript, Vite
   - Backend: Node.js, Express, PostgreSQL
   - Deployment: Docker, AWS
   
   Are these correct for this project?
   - If yes, we'll use these
   - If no, tell me what to change
   - If you're not sure, I can suggest alternatives
   ```

5. **Continues through Intent Translator**:
   - Echo Check (confirms understanding)
   - Blueprint (shows high-level plan)
   - Risk Assessment (identifies issues)
   - Waits for your approval
   - Implements when you say "yes"

---

## 📋 What the AI Does Automatically

### **Context Loading** (Silent):
- ✅ Reads all documentation files
- ✅ Understands your tech stack
- ✅ Loads coding standards (GOLDEN_RULES.md)
- ✅ Understands architecture (VERTICAL_SLICE_ARCHITECTURE.md)
- ✅ Loads Intent Translator protocol

### **Conversation Flow**:
- ✅ Asks targeted questions
- ✅ Confirms tech stack choices
- ✅ Suggests alternatives when needed
- ✅ Summarizes understanding
- ✅ Shows implementation plan
- ✅ Identifies risks
- ✅ Waits for approval

### **File Creation** (Based on Your Answers):
- ✅ Creates `project.md` with your project details
- ✅ Updates `TECH_STACK.md` with confirmed stack
- ✅ Creates PRPs (Product Requirement Prompts)
- ✅ Creates implementation plans
- ✅ Creates spec files (if needed)

---

## 🎯 Key Principles

### **1. NO Manual File Editing**
- You don't copy files
- You don't edit TECH_STACK.md manually
- You don't type commands
- AI asks, you answer, AI creates

### **2. Conversational Flow**
- AI guides you through questions
- One question at a time
- Clear, simple language
- Confirms everything

### **3. Tech Stack Confirmation**
- AI reads TECH_STACK.md template
- AI asks which technologies to use
- AI suggests alternatives
- AI confirms choices
- AI updates files automatically

### **4. Auto-Load Context**
- AI reads all relevant files automatically
- AI understands project structure
- AI knows coding standards
- AI knows architecture patterns

### **5. Wait for Approval**
- AI shows plan before implementing
- AI identifies risks
- AI waits for "yes"
- AI doesn't implement until approved

---

## 🔧 Technical Details

### **AGENTS.md Structure**

The `AGENTS.md` file contains:

1. **AUTO-START WORKFLOW** section (new!)
   - Triggers automatic conversation
   - Defines initial questions
   - Specifies context loading
   - Outlines tech stack confirmation

2. **Seven-Step Workflow** (reference)
   - Step 0: Context Loading
   - Step 1: Intent Clarification
   - Step 2: PRP Creation
   - Step 3: Planning
   - Step 4: Execution
   - Step 5: Validation
   - Step 6: Git Operations
   - Step 7: Utilities

3. **Command Reference** (58 commands)
   - All slash commands documented
   - Organized by workflow step
   - Usage examples

### **How AI Assistants Read AGENTS.md**

Different AI assistants handle AGENTS.md differently:

- **Augment**: Reads AGENTS.md automatically when in project directory
- **Claude Code**: Reads AGENTS.md from project root
- **Cursor**: Reads `.cursor/` directory and AGENTS.md
- **Windsurf**: Reads `.windsurf/workflows/` and AGENTS.md
- **Others**: Most AGENTS.md-compatible tools read it automatically

---

## 📚 Example Conversation

### **User**:
```bash
seedfw init
# Opens Augment
```

### **AI** (Automatically):
```
👋 Welcome to SeedFW! I'm ready to help you build your project.

I'll guide you through a quick setup to understand what you want to build.
This will take about 5-10 minutes.

Let's start with the basics:

**Question 1**: What do you want to build? (Describe your project or feature in 1-2 sentences)
```

### **User**:
```
I want to build a task management app with real-time collaboration
```

### **AI**:
```
Great! A task management app with real-time collaboration.

**Question 2**: Who is this for? (Who will use this?)
```

### **User**:
```
Small teams (5-20 people) who need to coordinate projects
```

### **AI**:
```
Perfect! Small teams for project coordination.

**Question 3**: What's the main goal? (What problem does this solve?)
```

### **User**:
```
Teams waste time in meetings and email threads. This will let them see what everyone is working on in real-time.
```

### **AI**:
```
Excellent! I understand:

📋 **Project**: Task management app with real-time collaboration
👥 **Users**: Small teams (5-20 people)
🎯 **Goal**: Reduce meeting/email overhead with real-time visibility

Now, let me confirm your tech stack. I see you have these technologies defined:

**Frontend**:
- React 18
- TypeScript
- Vite
- TailwindCSS

**Backend**:
- Node.js
- Express
- PostgreSQL
- WebSockets (for real-time)

**Deployment**:
- Docker
- AWS

Are these correct for this project?
- Type "yes" to use these
- Type "no" to change something
- Type "suggest" if you want alternatives
```

### **User**:
```
yes
```

### **AI**:
```
Perfect! ✅ Tech stack confirmed.

Let me show you the high-level plan:

📋 **Implementation Plan**:

1. **Database Schema** (1-2 days)
   - Users, Teams, Projects, Tasks tables
   - Real-time subscriptions

2. **Backend API** (2-3 days)
   - REST API for CRUD operations
   - WebSocket server for real-time updates
   - Authentication & authorization

3. **Frontend UI** (3-4 days)
   - Task board with drag-and-drop
   - Real-time updates
   - Team collaboration features

4. **Testing & Deployment** (1-2 days)
   - Unit tests
   - Integration tests
   - Docker setup
   - AWS deployment

**Total Estimate**: 7-11 days

⚠️ **Potential Risks**:
- WebSocket scaling for larger teams
- Real-time conflict resolution
- Database performance with many concurrent users

Does this plan look good? Should I proceed with creating the detailed PRPs?
```

---

## ✅ Benefits

1. **Faster Setup**: 5-10 minutes vs 30+ minutes
2. **No Manual Work**: AI creates everything
3. **Better Context**: AI understands your project deeply
4. **Confirmed Choices**: AI confirms tech stack before proceeding
5. **Clear Plan**: AI shows plan before implementing
6. **Risk Awareness**: AI identifies potential issues upfront

---

## 🔗 Related Documentation

- **AGENTS.md** - Full AI workflow instructions (auto-loaded by AI)
- **CLI_GUIDE.md** - All CLI commands
- **INSTALL.md** - Installation instructions
- **PUBLISHING.md** - How to publish updates

---

**🚀 Ready to try it? Run `seedfw init` and open your AI assistant!**

