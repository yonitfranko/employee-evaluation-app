import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "../../src/components/ui/card";
import { Label } from "../../src/components/ui/label";
import { Input } from "../../src/components/ui/input";
import { Button } from "../../src/components/ui/button";
import { Progress } from "../../src/components/ui/progress";
import { Alert, AlertDescription } from "../../src/components/ui/alert";
import { Save } from 'lucide-react';

const EmployeeEvaluation = () => {
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

  // Load saved data on initial render
  useEffect(() => {
    const saved = localStorage.getItem('employeeEvaluations');
    if (saved) {
      setSavedEmployees(JSON.parse(saved));
    }
  }, []);
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

    localStorage.setItem('employeeEvaluations', JSON.stringify(updatedEmployees));
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

  useEffect(() => {
    const performanceTotal = Object.values(performanceScores).reduce((a, b) => a + b, 0);
    const potentialTotal = Object.values(potentialScores).reduce((a, b) => a + b, 0);
    
    let performanceCategory = '';
    if (performanceTotal <= 21) performanceCategory = 'נמוך';
    else if (performanceTotal <= 33) performanceCategory = 'בינוני';
    else performanceCategory = 'גבוה';

    let potentialCategory = '';
    if (potentialTotal <= 28) potentialCategory = 'נמוך';
    else if (potentialTotal <= 34) potentialCategory = 'בינוני';
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

  return (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-6" dir="rtl">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">טופס הערכת עובדים</CardTitle>
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
                    <Button
                      key={index}
                      variant="outline"
                      onClick={() => loadEvaluation(employee)}
                      className={selectedEmployee?.employeeName === employee.employeeName ? 'bg-blue-100' : ''}
                    >
                      {employee.employeeName} - {employee.date}
                    </Button>
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
           
                     </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmployeeEvaluation;
