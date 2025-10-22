import React, { useState } from 'react';
import { Play, RotateCcw } from 'lucide-react';
import './App.css';

const MealyMooreMachines = () => {
  const [input, setInput] = useState('0110101');
  const [mealySteps, setMealySteps] = useState([]);
  const [mooreSteps, setMooreSteps] = useState([]);
  const [mealyOutput, setMealyOutput] = useState('');
  const [mooreOutput, setMooreOutput] = useState('');
  const [activeTab, setActiveTab] = useState('mealy');

  // Mealy Machine Implementation
  const runMealy = (inputStr) => {
    const steps = [];
    let state = 'A';
    let output = '';

    steps.push({ step: 0, input: '-', state: 'A', output: '-' });

    for (let i = 0; i < inputStr.length; i++) {
      const symbol = inputStr[i];
      let nextState = state;
      let outSymbol = '-';

      if (state === 'A') {
        if (symbol === '0') {
          nextState = 'B';
          outSymbol = '-';
        } else {
          nextState = 'A';
          outSymbol = '-';
        }
      } else if (state === 'B') {
        if (symbol === '0') {
          nextState = 'B';
          outSymbol = '-';
        } else {
          nextState = 'A';
          outSymbol = 'a';
        }
      }

      output += outSymbol;
      state = nextState;
      steps.push({ 
        step: i + 1, 
        input: symbol, 
        state: nextState, 
        output: outSymbol 
      });
    }

    return { steps, output };
  };

  // Moore Machine Implementation
  const runMoore = (inputStr) => {
    const steps = [];
    let state = 'A';
    let output = '';

    const stateOutputs = {
      'A': '0',
      'B': '0',
      'C': '1'
    };

    steps.push({ 
      step: 0, 
      input: '-', 
      state: 'A/0', 
      output: stateOutputs['A'] 
    });
    output += stateOutputs['A'];

    for (let i = 0; i < inputStr.length; i++) {
      const symbol = inputStr[i];
      let nextState = state;

      if (state === 'A') {
        if (symbol === '0') {
          nextState = 'B';
        } else {
          nextState = 'A';
        }
      } else if (state === 'B') {
        if (symbol === '0') {
          nextState = 'B';
        } else {
          nextState = 'C';
        }
      } else if (state === 'C') {
        if (symbol === '0') {
          nextState = 'B';
        } else {
          nextState = 'A';
        }
      }

      state = nextState;
      const outSymbol = stateOutputs[nextState];
      output += outSymbol;
      
      const stateLabel = `${nextState}/${stateOutputs[nextState]}`;
      
      steps.push({ 
        step: i + 1, 
        input: symbol, 
        state: stateLabel, 
        output: outSymbol 
      });
    }

    return { steps, output };
  };

  const handleRun = () => {
    const mealyResult = runMealy(input);
    const mooreResult = runMoore(input);
    
    setMealySteps(mealyResult.steps);
    setMealyOutput(mealyResult.output);
    setMooreSteps(mooreResult.steps);
    setMooreOutput(mooreResult.output);
  };

  const handleReset = () => {
    setInput('0110101');
    setMealySteps([]);
    setMooreSteps([]);
    setMealyOutput('');
    setMooreOutput('');
  };

  return (
    <div className="app-container">
      <div className="main-content">
        <h1 className="main-title">Mealy & Moore Machines</h1>
        <p className="subtitle">Detecting sequence '01' in binary strings</p>

        {/* Input Section */}
        <div className="input-section">
          <label className="input-label">
            Binary Input String
          </label>
          <div className="input-controls">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value.replace(/[^01]/g, ''))}
              className="text-input"
              placeholder="Enter binary string (0s and 1s)"
            />
            <button
              onClick={handleRun}
              className="btn btn-primary"
            >
              <Play size={18} /> Run
            </button>
            <button
              onClick={handleReset}
              className="btn btn-secondary"
            >
              <RotateCcw size={18} /> Reset
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="tabs-container">
          <button
            onClick={() => setActiveTab('mealy')}
            className={`tab ${activeTab === 'mealy' ? 'tab-active' : 'tab-inactive'}`}
          >
            Mealy Machine
          </button>
          <button
            onClick={() => setActiveTab('moore')}
            className={`tab ${activeTab === 'moore' ? 'tab-active' : 'tab-inactive'}`}
          >
            Moore Machine
          </button>
        </div>

        {/* Mealy Machine Content */}
        {activeTab === 'mealy' && (
          <div className="machine-section">
            <h2 className="machine-title">Mealy Machine</h2>
            <p className="machine-description">Output depends on current state AND input</p>
            
            {/* State Diagram */}
            <div className="diagram-container">
              <svg width="500" height="250" viewBox="0 0 500 250">
                {/* A State */}
                <circle cx="120" cy="125" r="40" fill="#e0e7ff" stroke="#4f46e5" strokeWidth="3"/>
                <text x="120" y="133" textAnchor="middle" className="state-text">A</text>
                
                {/* B State */}
                <circle cx="350" cy="125" r="40" fill="#e0e7ff" stroke="#4f46e5" strokeWidth="3"/>
                <text x="350" y="133" textAnchor="middle" className="state-text">B</text>
                
                {/* Start arrow */}
                <path d="M 40 125 L 80 125" stroke="#4f46e5" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                <text x="45" y="115" fontSize="14" fill="#4f46e5" fontWeight="bold">Start</text>
                
                {/* A to B: 0/0 */}
                <path d="M 160 125 L 310 125" stroke="#4f46e5" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                <text x="235" y="115" fontSize="16" fill="#059669" fontWeight="bold">0/0</text>
                
                {/* B to A: 1/1 */}
                <path d="M 350 165 Q 235 200 120 165" stroke="#4f46e5" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                <text x="230" y="215" fontSize="16" fill="#dc2626" fontWeight="bold">1/1</text>
                
                {/* A self-loop: 1/0 */}
                <path d="M 90 95 Q 65 55 90 95" stroke="#4f46e5" strokeWidth="2" markerEnd="url(#arrowhead)" fill="none"/>
                <text x="50" y="55" fontSize="16" fill="#6b7280" fontWeight="bold">1/0</text>
                
                {/* B self-loop: 0/0 */}
                <path d="M 380 95 Q 405 55 380 95" stroke="#4f46e5" strokeWidth="2" markerEnd="url(#arrowhead)" fill="none"/>
                <text x="395" y="55" fontSize="16" fill="#6b7280" fontWeight="bold">0/0</text>
                
                <defs>
                  <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                    <polygon points="0 0, 10 3, 0 6" fill="#4f46e5"/>
                  </marker>
                </defs>
              </svg>
            </div>

            {/* Legend */}
            <div className="legend legend-blue">
              <p className="legend-title">Transition Format: input/output</p>
              <ul className="legend-list">
                <li>• <span className="code-text">0/0</span> = Read '0', Output '0'</li>
                <li>• <span className="code-text">1/1</span> = Read '1', Output '1' (sequence '01' detected!)</li>
                <li>• <span className="code-text">1/0</span> = Read '1', Output '0'</li>
              </ul>
            </div>

            {/* Execution Table */}
            {mealySteps.length > 0 && (
              <div className="execution-section">
                <h3 className="execution-title">Execution Trace</h3>
                <div className="table-container">
                  <table className="execution-table">
                    <thead>
                      <tr className="table-header">
                        <th className="table-cell">Step</th>
                        <th className="table-cell">Input</th>
                        <th className="table-cell">Current State</th>
                        <th className="table-cell">Output</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mealySteps.map((step, idx) => (
                        <tr key={idx} className={idx % 2 === 0 ? 'table-row-even' : 'table-row-odd'}>
                          <td className="table-cell table-cell-center">{step.step}</td>
                          <td className="table-cell table-cell-center table-cell-input">{step.input}</td>
                          <td className="table-cell table-cell-center table-cell-state">{step.state}</td>
                          <td className="table-cell table-cell-center">
                            {step.output === '1' ? <span className="output-highlight">{step.output}</span> : step.output}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="output-section">
                  <p className="output-label">
                    Final Output: <span className="output-value">{mealyOutput}</span>
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Moore Machine Content */}
        {activeTab === 'moore' && (
          <div className="machine-section">
            <h2 className="machine-title">Moore Machine</h2>
            <p className="machine-description">Output depends ONLY on current state</p>
            
            {/* State Diagram */}
            <div className="diagram-container">
              <svg width="600" height="280" viewBox="0 0 600 280">
                {/* A/0 State */}
                <circle cx="100" cy="140" r="50" fill="#e0e7ff" stroke="#4f46e5" strokeWidth="3"/>
                <text x="100" y="148" textAnchor="middle" className="state-text">A/0</text>
                
                {/* B/0 State */}
                <circle cx="300" cy="140" r="50" fill="#e0e7ff" stroke="#4f46e5" strokeWidth="3"/>
                <text x="300" y="148" textAnchor="middle" className="state-text">B/0</text>
                
                {/* C/1 State */}
                <circle cx="500" cy="140" r="50" fill="#fef3c7" stroke="#f59e0b" strokeWidth="3"/>
                <text x="500" y="148" textAnchor="middle" className="state-text state-text-special">C/1</text>
                
                {/* Start arrow */}
                <path d="M 20 140 L 50 140" stroke="#4f46e5" strokeWidth="2" markerEnd="url(#arrowhead2)"/>
                <text x="22" y="130" fontSize="14" fill="#4f46e5" fontWeight="bold">Start</text>
                
                {/* A to B: 0 */}
                <path d="M 150 140 L 250 140" stroke="#4f46e5" strokeWidth="2" markerEnd="url(#arrowhead2)"/>
                <text x="200" y="130" fontSize="16" fill="#059669" fontWeight="bold">0</text>
                
                {/* B to C: 1 */}
                <path d="M 350 140 L 450 140" stroke="#4f46e5" strokeWidth="2" markerEnd="url(#arrowhead2)"/>
                <text x="400" y="130" fontSize="16" fill="#dc2626" fontWeight="bold">1</text>
                
                {/* C to B: 0 */}
                <path d="M 500 190 Q 400 240 300 190" stroke="#4f46e5" strokeWidth="2" markerEnd="url(#arrowhead2)"/>
                <text x="395" y="255" fontSize="16" fill="#059669" fontWeight="bold">0</text>
                
                {/* C to A: 1 */}
                <path d="M 480 95 Q 300 30 120 95" stroke="#4f46e5" strokeWidth="2" markerEnd="url(#arrowhead2)"/>
                <text x="295" y="20" fontSize="16" fill="#6b7280" fontWeight="bold">1</text>
                
                {/* A self-loop: 1 */}
                <path d="M 65 105 Q 40 60 65 105" stroke="#4f46e5" strokeWidth="2" markerEnd="url(#arrowhead2)" fill="none"/>
                <text x="20" y="65" fontSize="16" fill="#6b7280" fontWeight="bold">1</text>
                
                {/* B self-loop: 0 */}
                <path d="M 335 105 Q 360 60 335 105" stroke="#4f46e5" strokeWidth="2" markerEnd="url(#arrowhead2)" fill="none"/>
                <text x="355" y="65" fontSize="16" fill="#6b7280" fontWeight="bold">0</text>
                
                <defs>
                  <marker id="arrowhead2" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                    <polygon points="0 0, 10 3, 0 6" fill="#4f46e5"/>
                  </marker>
                </defs>
              </svg>
            </div>

            {/* Legend */}
            <div className="legend legend-amber">
              <p className="legend-title">State Format: StateName/Output</p>
              <ul className="legend-list">
                <li>• <span className="code-text">A/0</span> = State A outputs '0'</li>
                <li>• <span className="code-text">B/0</span> = State B outputs '0'</li>
                <li>• <span className="code-text code-text-special">C/1</span> = State C outputs '1' (sequence '01' detected!)</li>
              </ul>
            </div>

            {/* Execution Table */}
            {mooreSteps.length > 0 && (
              <div className="execution-section">
                <h3 className="execution-title">Execution Trace</h3>
                <div className="table-container">
                  <table className="execution-table">
                    <thead>
                      <tr className="table-header">
                        <th className="table-cell">Step</th>
                        <th className="table-cell">Input</th>
                        <th className="table-cell">Current State</th>
                        <th className="table-cell">Output</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mooreSteps.map((step, idx) => (
                        <tr key={idx} className={idx % 2 === 0 ? 'table-row-even' : 'table-row-odd'}>
                          <td className="table-cell table-cell-center">{step.step}</td>
                          <td className="table-cell table-cell-center table-cell-input">{step.input}</td>
                          <td className="table-cell table-cell-center table-cell-state">{step.state}</td>
                          <td className="table-cell table-cell-center">
                            {step.output === '1' ? <span className="output-highlight">{step.output}</span> : step.output}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="output-section">
                  <p className="output-label">
                    Final Output: <span className="output-value">{mooreOutput}</span>
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Key Differences */}
        <div className="differences-section">
          <h3 className="differences-title">Key Differences</h3>
          <div className="differences-grid">
            <div className="difference-card difference-card-blue">
              <h4 className="difference-title">Mealy Machine</h4>
              <ul className="difference-list">
                <li>• Output depends on current state AND input</li>
                <li>• Fewer states (A, B)</li>
                <li>• Transitions labeled as input/output</li>
                <li>• Outputs '1' immediately when '01' detected</li>
              </ul>
            </div>
            <div className="difference-card difference-card-amber">
              <h4 className="difference-title">Moore Machine</h4>
              <ul className="difference-list">
                <li>• Output depends ONLY on current state</li>
                <li>• More states needed (A/0, B/0, C/1)</li>
                <li>• States labeled as state/output</li>
                <li>• Output delayed by one transition</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealyMooreMachines;