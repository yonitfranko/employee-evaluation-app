import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Alert, AlertDescription } from "./ui/alert";
import { Save } from 'lucide-react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceArea, ReferenceLine } from 'recharts';

const deleteEmployee = (employeeName) => {
  const updatedEmployees = savedEmployees.filter(emp => emp.employeeName !== employeeName);
  localStorage.setItem(`employeeEvaluations_${schoolDomain}`, JSON.stringify(updatedEmployees));
  setSavedEmployees(updatedEmployees);
  
  // אם העובד שנמחק הוא העובד הנוכחי, נאפס את הטופס
  if (employeeName === selectedEmployee?.employeeName) {
    resetForm();
  }
  
  setSaveMessage('העובד נמחק בהצלחה');
  setTimeout(() => {
    setSaveMessage('');
  }, 3000);
};


const EmployeeEvaluation = ({ schoolDomain }) => {  // שינוי רק בשורה הזו  console.log('EmployeeEvaluation is rendering');

  const [employeeName, setEmployeeName] = useState('');
  const [performanceScores, setPerformanceScores] = useState({});
  const [potentialScores, setPotentialScores] = useState({});
  const [savedEmployees, setSavedEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [saveMessage, setSaveMessage] = useState('');
  
  const [results, setResults] = useState({
    performanceTotal: 0,
    potentialTotal: 0,
    performanceCategory: '',
    potentialCategory: '',
    category: ''
  });
  // הוספת פונקציית המחיקה החדשה כאן
  const deleteEmployee = (employeeName) => {
    const updatedEmployees = savedEmployees.filter(emp => emp.employeeName !== employeeName);
    localStorage.setItem(`employeeEvaluations_${schoolDomain}`, JSON.stringify(updatedEmployees));
    setSavedEmployees(updatedEmployees);
    
    if (selectedEmployee?.employeeName === employeeName) {
      resetForm();
    }
    
    setSaveMessage('העובד נמחק בהצלחה');
    setTimeout(() => {
      setSaveMessage('');
    }, 3000);
  };


  const prepareChartData = () => {
    const data = savedEmployees.map(employee => {
      const item = {
        name: employee.employeeName,
        x: employee.results.performanceTotal,
        y: employee.results.potentialTotal,
      };
      console.log('Chart data item:', item); // נוסיף לוג לכל פריט
      return item;
    });
    return data;
  };
  

  // Load saved data on initial render
  useEffect(() => {
    const saved = localStorage.getItem(`employeeEvaluations_${schoolDomain}`);
    if (saved) {
      setSavedEmployees(JSON.parse(saved));
    }
  }, [schoolDomain]);
  const categoryDescriptions = {
  'Super Bringgsters': 'מובילים ומצטיינים בארגון. משלבים ביצועים ופוטנציאל גבוהים. יש לשמר, לתגמל ולהציב אתגרים חדשים.',
  'Rising Bringgsters': 'בעלי פוטנציאל גבוה וביצועים טובים. מועמדים מצוינים לקידום ופיתוח מנהיגותי. יש להשקיע בהכשרתם.',
  'Enigma': 'בעלי פוטנציאל גבוה אך ביצועים נמוכים יחסית. נדרשת בחינה מעמיקה של החסמים ותכנית פיתוח ממוקדת.',
  'Bringg Influencers': 'מובילי דעה ומשפיעים בארגון. ביצועים גבוהים ופוטנציאל בינוני. חשובים ליציבות ולהעברת ידע.',
  'Core Bringgsters': 'עמוד השדרה של הארגון. ביצועים ופוטנציאל בינוניים-טובים. יציבים ומהימנים. יש לשמר ולפתח.',
  'Dilemma': 'פוטנציאל בינוני וביצועים נמוכים. נדרשת החלטה האם להשקיע בפיתוח או לשקול התאמה מחדש.',
  'Experts': 'מומחים מקצועיים עם ביצועים גבוהים אך פוטנציאל נמוך לתפקידי ניהול. יש לפתח מסלול מקצועי.',
  'Effective': 'ביצועים ופוטנציאל בינוניים-נמוכים. מבצעים את עבודתם נאמנה אך ללא בולטות מיוחדת.',
  'Up or Out': 'ביצועים ופוטנציאל נמוכים. נדרשת תכנית שיפור מיידית או שקילת המשך העסקה.'
};

  const performanceQuestions = [
    'עד כמה העובד ממלא את משימותיו באופן מקצועי ואיכותי?',
    'עד כמה ניתן לסמוך על העובד שיבצע את משימותיו באופן מיטבי?',
    'עד כמה העובד עצמאי במילוי משימותיו?',
    'עד כמה העובד מצליח לעמוד בלוחות זמנים ולהשלים משימות?',
    'עד כמה העובד משפיע לטובה על סביבתו המקצועית?',
    'עד כמה העובד תורם לארגון?',
    'באיזו מידה העובד מהווה דמות דומיננטית ומודל לחיקוי בארגון?',
    'עד כמה העובד תורם לפתרון בעיות או לשיפור תהליכים?',
    'עד כמה העובד מעורר השראה או משפיע על אחרים?'
  ];

  const potentialQuestions = [
    'באיזו מידה העובד מתמודד עם משימות מורכבות או מאתגרות?',
    'עד כמה העובד מגלה תכונות מנהיגות?',
    'עד כמה העובד מגלה יוזמה ומנהיגות במצבים שונים?',
    'עד כמה העובד מגלה אחריות במילוי משימותיו?',
    'עד כמה העובד מסוגל להתמודד עם שינויים ואתגרים בלתי צפויים?',
    'האם העובד מראה רצון ו/או יכולת להתפתח?',
    'האם העובד מראה רצון ומסוגלות ללקיחת תפקידים חדשים בארגון?',
    'האם העובד מסוגל להתמודד עם ריבוי משימות?',
    'עד כמה העובד מתאים לתפקידי ניהול בתוך הארגון?',
    'באיזו מידה העובד משתף פעולה עם עמיתים ומנהל תקשורת טובה?',
    'האם העובד פתוח למשוב ומוכן לשפר את ביצועיו?',
    'עד כמה ההשקעה בעובד חיונית לארגון?'
  ];
  const handleScoreChange = (questionType, index, value) => {
    if (questionType === 'performance') {
      setPerformanceScores(prev => ({...prev, [index]: parseInt(value)}));
    } else {
      setPotentialScores(prev => ({...prev, [index]: parseInt(value)}));
    }
  };

  const saveEvaluation = () => {
    if (!employeeName) {
      setSaveMessage('יש להזין שם עובד');
      return;
    }

    const evaluationData = {
      employeeName,
      date: new Date().toLocaleDateString(),
      performanceScores,
      potentialScores,
      results
    };

    const updatedEmployees = [...savedEmployees];
    const existingIndex = updatedEmployees.findIndex(e => e.employeeName === employeeName);
    
    if (existingIndex >= 0) {
      updatedEmployees[existingIndex] = evaluationData;
    } else {
      updatedEmployees.push(evaluationData);
    }

    localStorage.setItem(`employeeEvaluations_${schoolDomain}`, JSON.stringify(updatedEmployees));
    setSavedEmployees(updatedEmployees);
    setSaveMessage('הנתונים נשמרו בהצלחה');
    
    setTimeout(() => {
      setSaveMessage('');
    }, 3000);
  };

  const loadEvaluation = (employee) => {
    setEmployeeName(employee.employeeName);
    setPerformanceScores(employee.performanceScores);
    setPotentialScores(employee.potentialScores);
    setResults(employee.results);
    setSelectedEmployee(employee);
  };

  const resetForm = () => {
    setEmployeeName('');
    setPerformanceScores({});
    setPotentialScores({});
    setResults({
      performanceTotal: 0,
      potentialTotal: 0,
      performanceCategory: '',
      potentialCategory: '',
      category: ''
    });
    setSelectedEmployee(null);
  };
  const gridBoxes = [
    // שורה עליונה (40-60)
    { title: 'Enigma', percent: '7%', x: [0, 15], y: [40, 60] },
    { title: 'Rising Bringgsters', percent: '10%', x: [15, 30], y: [40, 60] },
    { title: 'Super Bringgsters', percent: '5%', x: [30, 45], y: [40, 60] },
    
    // שורה אמצעית (20-40)
    { title: 'Dilemma', percent: '5%', x: [0, 15], y: [20, 40] },
    { title: 'Core Bringgsters', percent: '35%', x: [15, 30], y: [20, 40] },
    { title: 'Bringg Influencers', percent: '10%', x: [30, 45], y: [20, 40] },
    
    // שורה תחתונה (0-20)
    { title: 'Up or Out', percent: '3%', x: [0, 15], y: [0, 20] },
    { title: 'Effective', percent: '15%', x: [15, 30], y: [0, 20] },
    { title: 'Experts', percent: '10%', x: [30, 45], y: [0, 20] }
];

useEffect(() => {
  const performanceTotal = Object.values(performanceScores).reduce((a, b) => a + b, 0);
  const potentialTotal = Object.values(potentialScores).reduce((a, b) => a + b, 0);
  
  let performanceCategory = '';
  if (performanceTotal <= 15) performanceCategory = 'נמוך';
  else if (performanceTotal <= 30) performanceCategory = 'בינוני';
  else performanceCategory = 'גבוה';

  let potentialCategory = '';
  if (potentialTotal <= 20) potentialCategory = 'נמוך';
  else if (potentialTotal <= 40) potentialCategory = 'בינוני';
  else potentialCategory = 'גבוה';

  const categories = {
    'נמוך-נמוך': 'Up or Out',
    'נמוך-בינוני': 'Dilemma',
    'נמוך-גבוה': 'Enigma',
    'בינוני-נמוך': 'Effective',
    'בינוני-בינוני': 'Core Bringgsters',
    'בינוני-גבוה': 'Rising Bringgsters',
    'גבוה-נמוך': 'Experts',
    'גבוה-בינוני': 'Bringg Influencers',
    'גבוה-גבוה': 'Super Bringgsters'
  };

  const key = `${performanceCategory}-${potentialCategory}`;
  
  setResults({
    performanceTotal,
    potentialTotal,
    performanceCategory,
    potentialCategory,
    category: categories[key] || ''
  });
}, [performanceScores, potentialScores]);

    const referenceLines = [
    // קווים אנכיים (על ציר ה-X)
    { x: 21, stroke: "#666", strokeDasharray: "3 3" },
    { x: 33, stroke: "#666", strokeDasharray: "3 3" },
    // קווים אופקיים (על ציר ה-Y)
    { y: 28, stroke: "#666", strokeDasharray: "3 3" },
    { y: 34, stroke: "#666", strokeDasharray: "3 3" }
  ].map((line, index) => (
    <ReferenceLine 
      key={index} 
      x={line.x}
      y={line.y}
      stroke={line.stroke}
      strokeDasharray={line.strokeDasharray}
    />
  ));
  
 return (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-6" dir="rtl">
            <h1>טופס הערכת עובדים</h1>  {/* הוסיפי שורה זו */}

<Card>
  <CardHeader>
    <CardTitle className="text-2xl font-bold text-center">טופס הערכת עובדים</CardTitle>
    <div className="mt-4 text-sm text-gray-600 space-y-2">
      <p>
        השאלון והמודל נועדו להוות כלי עזר אפקטיבי להערכה, זיהוי עובדים מובילים והכוונתם לפיתוח מקצועי ואישי מותאם. הקפידו למלא אותו באופן אובייקטיבי ככל הניתן על סמך תצפיות, ניסיון והיכרות מעמיקה עם העובדים.
      </p>
      <div className="bg-gray-50 p-3 rounded-md">
        <p className="font-medium mb-2">סולם הדירוג:</p>
        <div className="grid grid-cols-5 gap-2 text-center">
          <div>1 - לא קיים בכלל</div>
          <div>2 - רמה נמוכה</div>
          <div>3 - רמה סבירה/מספקת</div>
          <div>4 - רמה גבוהה</div>
          <div>5 - רמה גבוהה מאוד</div>
        </div>
      </div>
      <div className="mt-4">
        <p><strong>שני חלקי ההערכה:</strong></p>
        <ul className="list-disc list-inside mt-2">
          <li><strong>רמת ביצועים</strong> – מתייחס לתפקוד העובד, ביצוע משימותיו, איכות העבודה ועמידה ביעדים.</li>
          <li><strong>פוטנציאל</strong> – מתייחס ליכולת העובד להתפתח, להתמודד עם אתגרים ולממש תפקידים מורכבים או ניהוליים בעתיד.</li>
        </ul>
      </div>
    </div>
  </CardHeader>
            <CardContent>
          <div className="mb-6">
            <div className="flex justify-between items-end gap-4">
              <div className="flex-1">
                <Label htmlFor="employeeName">שם העובד/ת:</Label>
                <Input
                  id="employeeName"
                  value={employeeName}
                  onChange={(e) => setEmployeeName(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={saveEvaluation} className="flex items-center gap-2">
                  <Save className="w-4 h-4" />
                  שמור הערכה
                </Button>
                <Button variant="outline" onClick={resetForm}>
                  טופס חדש
                </Button>
              </div>
            </div>
            
            {saveMessage && (
              <Alert className="mt-4">
                <AlertDescription>{saveMessage}</AlertDescription>
              </Alert>
            )}

{savedEmployees.length > 0 && (
  <div className="mt-4">
    <Label>הערכות שמורות:</Label>
    <div className="flex gap-2 mt-2 flex-wrap">
      {savedEmployees.map((employee, index) => (
        <div key={index} className="relative group">
          <Button
            variant="outline"
            onClick={() => loadEvaluation(employee)}
            className={`${selectedEmployee?.employeeName === employee.employeeName ? 'bg-blue-100' : ''} pr-8`}
          >
            {employee.employeeName} - {employee.date}
          </Button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (window.confirm(`האם אתה בטוח שברצונך למחוק את ההערכה של ${employee.employeeName}?`)) {
                deleteEmployee(employee.employeeName);
              }
            }}
            className="absolute top-1 right-1 p-1 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  </div>
)}
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">רמת ביצועים</h3>
              {performanceQuestions.map((question, index) => (
                <div key={index} className="mb-4">
                  <Label>{question}</Label>
                  <div className="flex gap-4 mt-2">
                    {[1,2,3,4,5].map(score => (
                      <Button
                        key={score}
                        variant={performanceScores[index] === score ? "default" : "outline"}
                        onClick={() => handleScoreChange('performance', index, score)}
                        className="w-12 h-12"
                      >
                        {score}
                      </Button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">פוטנציאל</h3>
              {potentialQuestions.map((question, index) => (
                <div key={index} className="mb-4">
                  <Label>{question}</Label>
                  <div className="flex gap-4 mt-2">
                    {[1,2,3,4,5].map(score => (
                      <Button
                        key={score}
                        variant={potentialScores[index] === score ? "default" : "outline"}
                        onClick={() => handleScoreChange('potential', index, score)}
                        className="w-12 h-12"
                      >
                        {score}
                      </Button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 space-y-4">
            <div>
              <h3 className="font-semibold">ציון רמת ביצועים: {results.performanceTotal}</h3>
              <Progress value={(results.performanceTotal / 45) * 100} className="mt-2" />
              <p>קטגוריה: {results.performanceCategory}</p>
            </div>

            <div>
              <h3 className="font-semibold">ציון פוטנציאל: {results.potentialTotal}</h3>
              <Progress value={(results.potentialTotal / 60) * 100} className="mt-2" />
              <p>קטגוריה: {results.potentialCategory}</p>
            </div>

            {results.category && (
  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
    <h3 className="text-xl text-center">תוצאה סופית</h3>
    <p className="text-center text-lg mt-2 font-bold">{results.category}</p>
    <p className="text-center text-sm mt-4 text-gray-700">
      {categoryDescriptions[results.category]}
    </p>
  </div>
)}
<div className="mt-8 h-96">
  <h3 className="text-lg mb-4">פיזור עובדים לפי ביצועים ופוטנציאל</h3>
  <ResponsiveContainer width="100%" height="100%">
  <ScatterChart margin={{
    top: 20,
    right: 20,
    bottom: 20,
    left: 20,
  }}>
  <CartesianGrid strokeDasharray="3 3" />
  <XAxis 
    type="number" 
    dataKey="x" 
    name="ביצועים" 
    label={{ value: 'רמת ביצועים', position: 'bottom' }}
    domain={[0, 45]}
  />
  <YAxis 
    type="number" 
    dataKey="y" 
    name="פוטנציאל" 
    label={{ value: 'פוטנציאל', angle: -90, position: 'left' }}
    domain={[0, 60]}
  />
 
 <Tooltip
  content={props => {
    console.log('Tooltip props:', props);  // נוסיף לוג לבדיקה
    const { active, payload } = props;
    
    if (!active || !payload || !payload.length) return null;
    
    const item = payload[0].payload;
    return (
      <div className="bg-white p-3 border rounded-lg shadow-lg" dir="rtl">
        <p className="font-bold">{item.name}</p>
        <div className="mt-1">
          <p>ביצועים: {item.x}</p>
          <p>פוטנציאל: {item.y}</p>
        </div>
      </div>
    );
  }}
/>
    <Scatter 
    name="עובדים" 
    data={prepareChartData()} 
    fill="#8884d8"
    fillOpacity={0.6}
    stroke="#8884d8"
    strokeWidth={2}
    r={6}
  />
  
  {/* קווי הייחוס */}
  <ReferenceLine x={15} stroke="#666" strokeDasharray="3 3" />
  <ReferenceLine x={30} stroke="#666" strokeDasharray="3 3" />
  <ReferenceLine y={20} stroke="#666" strokeDasharray="3 3" />
  <ReferenceLine y={40} stroke="#666" strokeDasharray="3 3" />

  {/* התיבות */}
  {gridBoxes.map((box, index) => (
    <ReferenceArea
      key={index}
      x1={box.x[0]}
      x2={box.x[1]}
      y1={box.y[0]}
      y2={box.y[1]}
      stroke="#666"
      strokeOpacity={0.3}
      fill="#f0f0f0"
      fillOpacity={0.1}
      label={{
        value: `${box.title}\n${box.percent}`,
        position: 'center',
        fill: '#666',
        fontSize: 12
      }}
    />
  ))}
</ScatterChart>
                
  </ResponsiveContainer>
</div> 
                     </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmployeeEvaluation;
