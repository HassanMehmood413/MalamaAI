
# MalamaAI

MalamaAI is a machine learning-powered application designed to recognize various skin diseases using advanced AI models. The name "Malama" is a Hawaiian word that means 'to care for,' reflecting the project's mission to provide care through technology. This project employs the LLM 3.370b model, built on top of a fine-tuned version of Dinov2, enhancing its accuracy and reliability in disease recognition.

## Features

- **Interactive Frontend:** Built with **Next.js** for speed and interactivity.
- **Scalable Backend:** Powered by **Flask**, supporting RESTful API integration.
- **Enhanced Model:** Utilizes LLM 3.370b on top of a fine-tuned version of Dinov2 for improved accuracy.

## Project Structure

```plaintext
MalamaAI/
│
├── Frontend/              # Contains the Next.js frontend
│   ├── app/               # Next.js application
│   ├── components/        # Reusable components
│   ├── svgs/              # SVG assets
│   ├── .gitignore         # Git ignored files
│   ├── next.config.mjs    # Next.js configuration
│   ├── package-lock.json   # Locked versions of dependencies
│   ├── package.json       # Frontend dependencies and scripts
│   ├── postcss.config.mjs # PostCSS configuration
│   ├── README.md          # Frontend documentation
│   ├── tailwind.config.ts  # Tailwind CSS configuration
│   └── tsconfig.json      # TypeScript configuration
│
├── webapp/                # Flask backend application
│   ├── __pycache__/       # Compiled Python files
│   ├── static/            # Static files for Flask
│   ├── templates/         # HTML templates for rendering
│   ├── app.py             # Main API logic
│   ├── model.py           # Model definition and training logic
│   ├── .gitignore         # Git ignored files
│   ├── MalamaAi.pptx      # Presentation (overview of the project)
│   ├── README.md          # Backend documentation
│   └── requirements.txt   # Backend dependencies
```

## Getting Started

### Prerequisites

- **Node.js** (for frontend development)
- **Python 3.8+** (for backend)
- **pip** (to install Python dependencies)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/row-huh/MalamaAI.git
   cd MalamaAI
   ```

2. **Set up the backend:**
   ```bash
   cd webapp
   pip install -r requirements.txt
   ```

3. **Set up the frontend:**
   ```bash
   cd ../Frontend
   npm install
   ```

4. **Run the application:**
   - **Backend:** Start the Flask server:
     ```bash
     python app.py
     ```
   - **Frontend:** Start the Next.js server:
     ```bash
     npm run dev
     ```

5. Open the application in your browser at `http://localhost:3000`.
