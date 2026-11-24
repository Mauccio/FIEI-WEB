var firstName = 'Mauricio';
var lastName = 'Fonseca Pizarro';
var fullName = firstName + ' ' + lastName; 
var initials = firstName[0] + lastName[0];
var cycleName = 'Bienvenid@';

var passingGrade = 11;  
var weightPractice = 4;  
var weightMidterm = 3;   
var weightFinal = 3;   
var noGrade = '—';

var courseCodes = ['100557', '101009', '100558', '100560', '100556', '100382', '100555', '100442'];
var courseNames = ['Tecnologías de la Información y Comunicación', 'Matemática Discreta para Informática', 'Cálculo Integral',
                   'Física', 'Medio Ambiente y Desarrollo Sostenible', 'Inglés II', 'Liderazgo y Desarrollo Personal', 'Sociología'];
var shifts = ['M', 'M', 'M', 'M', 'M', 'T', 'M', 'M'];
var credits = [2, 3, 4, 4, 3, 1, 3, 2];
var practiceGrades = [16, 14, 9, 17, 12, 13, 15, noGrade];
var midtermGrades = [15, 13, 10, 16, 11, 14, noGrade, noGrade];
var finalGrades = [17, 15, 11, 18, 13, 12, noGrade, noGrade];

var complete0 = practiceGrades[0] !== noGrade && midtermGrades[0] !== noGrade && finalGrades[0] !== noGrade;
var tenths0 = 0;
var average0 = noGrade;
var passed0 = false;
var status0 = 'pending';
if (complete0) {
  tenths0 = practiceGrades[0] * weightPractice + midtermGrades[0] * weightMidterm + finalGrades[0] * weightFinal;
  average0 = tenths0 / 10;
  passed0 = average0 >= passingGrade;
  if (passed0) {
    status0 = 'true';
  } else {
    status0 = 'false';
  }
}

var complete1 = practiceGrades[1] !== noGrade && midtermGrades[1] !== noGrade && finalGrades[1] !== noGrade;
var tenths1 = 0;
var average1 = noGrade;
var passed1 = false;
var status1 = 'pending';
if (complete1) {
  tenths1 = practiceGrades[1] * weightPractice + midtermGrades[1] * weightMidterm + finalGrades[1] * weightFinal;
  average1 = tenths1 / 10;
  passed1 = average1 >= passingGrade;
  if (passed1) {
    status1 = 'true';
  } else {
    status1 = 'false';
  }
}

var complete2 = practiceGrades[2] !== noGrade && midtermGrades[2] !== noGrade && finalGrades[2] !== noGrade;
var tenths2 = 0;
var average2 = noGrade;
var passed2 = false;
var status2 = 'pending';
if (complete2) {
  tenths2 = practiceGrades[2] * weightPractice + midtermGrades[2] * weightMidterm + finalGrades[2] * weightFinal;
  average2 = tenths2 / 10;
  passed2 = average2 >= passingGrade;
  if (passed2) {
    status2 = 'true';
  } else {
    status2 = 'false';
  }
}

var complete3 = practiceGrades[3] !== noGrade && midtermGrades[3] !== noGrade && finalGrades[3] !== noGrade;
var tenths3 = 0;
var average3 = noGrade;
var passed3 = false;
var status3 = 'pending';
if (complete3) {
  tenths3 = practiceGrades[3] * weightPractice + midtermGrades[3] * weightMidterm + finalGrades[3] * weightFinal;
  average3 = tenths3 / 10;
  passed3 = average3 >= passingGrade;
  if (passed3) {
    status3 = 'true';
  } else {
    status3 = 'false';
  }
}

var complete4 = practiceGrades[4] !== noGrade && midtermGrades[4] !== noGrade && finalGrades[4] !== noGrade;
var tenths4 = 0;
var average4 = noGrade;
var passed4 = false;
var status4 = 'pending';
if (complete4) {
  tenths4 = practiceGrades[4] * weightPractice + midtermGrades[4] * weightMidterm + finalGrades[4] * weightFinal;
  average4 = tenths4 / 10;
  passed4 = average4 >= passingGrade;
  if (passed4) {
    status4 = 'true';
  } else {
    status4 = 'false';
  }
}

var complete5 = practiceGrades[5] !== noGrade && midtermGrades[5] !== noGrade && finalGrades[5] !== noGrade;
var tenths5 = 0;
var average5 = noGrade;
var passed5 = false;
var status5 = 'pending';
if (complete5) {
  tenths5 = practiceGrades[5] * weightPractice + midtermGrades[5] * weightMidterm + finalGrades[5] * weightFinal;
  average5 = tenths5 / 10;
  passed5 = average5 >= passingGrade;
  if (passed5) {
    status5 = 'true';
  } else {
    status5 = 'false';
  }
}

var complete6 = practiceGrades[6] !== noGrade && midtermGrades[6] !== noGrade && finalGrades[6] !== noGrade;
var tenths6 = 0;
var average6 = noGrade;
var passed6 = false;
var status6 = 'pending';
if (complete6) {
  tenths6 = practiceGrades[6] * weightPractice + midtermGrades[6] * weightMidterm + finalGrades[6] * weightFinal;
  average6 = tenths6 / 10;
  passed6 = average6 >= passingGrade;
  if (passed6) {
    status6 = 'true';
  } else {
    status6 = 'false';
  }
}

var complete7 = practiceGrades[7] !== noGrade && midtermGrades[7] !== noGrade && finalGrades[7] !== noGrade;
var tenths7 = 0;
var average7 = noGrade;
var passed7 = false;
var status7 = 'pending';
if (complete7) {
  tenths7 = practiceGrades[7] * weightPractice + midtermGrades[7] * weightMidterm + finalGrades[7] * weightFinal;
  average7 = tenths7 / 10;
  passed7 = average7 >= passingGrade;
  if (passed7) {
    status7 = 'true';
  } else {
    status7 = 'false';
  }
}

var courseCount = courseNames.length;

var totalCredits = credits[0] + credits[1] + credits[2] + credits[3] + credits[4] + credits[5] + credits[6] + credits[7];

// Los booleanos suman como 1 (true) o 0 (false)
var finishedCount = complete0 + complete1 + complete2 + complete3 + complete4 + complete5 + complete6 + complete7;
var approvedCount = passed0 + passed1 + passed2 + passed3 + passed4 + passed5 + passed6 + passed7;
var failedCount = finishedCount - approvedCount;
var inProgressCount = courseCount - finishedCount;

var approvedCredits = credits[0] * passed0 + credits[1] * passed1 + credits[2] * passed2 + credits[3] * passed3 + credits[4] * passed4 + credits[5] * passed5 + credits[6] * passed6 + credits[7] * passed7;
var finishedCredits = credits[0] * complete0 + credits[1] * complete1 + credits[2] * complete2 + credits[3] * complete3 + credits[4] * complete4 + credits[5] * complete5 + credits[6] * complete6 + credits[7] * complete7;

// El promedio ponderado solo cuenta los cursos terminados
var weightedSum = tenths0 * credits[0] + tenths1 * credits[1] + tenths2 * credits[2] + tenths3 * credits[3] + tenths4 * credits[4] + tenths5 * credits[5] + tenths6 * credits[6] + tenths7 * credits[7];
var gpa = weightedSum / (finishedCredits * 10);

var creditsBefore = 84;   
var creditsTotal = 220;  
var creditsDone = creditsBefore + approvedCredits;
var progress = creditsDone / creditsTotal * 100;

var cycleLabels = ['1', '2', '3', '4', '5'];
var cycleGpa = [12.4, 12.9, 13.2, 12.8, gpa];  

var enrolled = true;
var documentsComplete = true;
var paymentsUpToDate = true;
var surveyDone = false;

var row0 = '<tr>' +
  '<td><span class="code">' + courseCodes[0] + '</span>' + courseNames[0] + '</td>' +
  '<td class="n">' + credits[0] + '</td>' +
  '<td class="n">' + practiceGrades[0] + '</td>' +
  '<td class="n">' + midtermGrades[0] + '</td>' +
  '<td class="n">' + finalGrades[0] + '</td>' +
  '<td class="n avg">' + average0 + '<span class="bar ' + status0 + '"><span style="width: ' + (tenths0 / 2) + '%"></span></span></td>' +
  '<td><span class="badge ' + status0 + '"></span></td>' +
  '</tr>';

var row1 = '<tr>' +
  '<td><span class="code">' + courseCodes[1] + '</span>' + courseNames[1] + '</td>' +
  '<td class="n">' + credits[1] + '</td>' +
  '<td class="n">' + practiceGrades[1] + '</td>' +
  '<td class="n">' + midtermGrades[1] + '</td>' +
  '<td class="n">' + finalGrades[1] + '</td>' +
  '<td class="n avg">' + average1 + '<span class="bar ' + status1 + '"><span style="width: ' + (tenths1 / 2) + '%"></span></span></td>' +
  '<td><span class="badge ' + status1 + '"></span></td>' +
  '</tr>';

var row2 = '<tr>' +
  '<td><span class="code">' + courseCodes[2] + '</span>' + courseNames[2] + '</td>' +
  '<td class="n">' + credits[2] + '</td>' +
  '<td class="n">' + practiceGrades[2] + '</td>' +
  '<td class="n">' + midtermGrades[2] + '</td>' +
  '<td class="n">' + finalGrades[2] + '</td>' +
  '<td class="n avg">' + average2 + '<span class="bar ' + status2 + '"><span style="width: ' + (tenths2 / 2) + '%"></span></span></td>' +
  '<td><span class="badge ' + status2 + '"></span></td>' +
  '</tr>';

var row3 = '<tr>' +
  '<td><span class="code">' + courseCodes[3] + '</span>' + courseNames[3] + '</td>' +
  '<td class="n">' + credits[3] + '</td>' +
  '<td class="n">' + practiceGrades[3] + '</td>' +
  '<td class="n">' + midtermGrades[3] + '</td>' +
  '<td class="n">' + finalGrades[3] + '</td>' +
  '<td class="n avg">' + average3 + '<span class="bar ' + status3 + '"><span style="width: ' + (tenths3 / 2) + '%"></span></span></td>' +
  '<td><span class="badge ' + status3 + '"></span></td>' +
  '</tr>';

var row4 = '<tr>' +
  '<td><span class="code">' + courseCodes[4] + '</span>' + courseNames[4] + '</td>' +
  '<td class="n">' + credits[4] + '</td>' +
  '<td class="n">' + practiceGrades[4] + '</td>' +
  '<td class="n">' + midtermGrades[4] + '</td>' +
  '<td class="n">' + finalGrades[4] + '</td>' +
  '<td class="n avg">' + average4 + '<span class="bar ' + status4 + '"><span style="width: ' + (tenths4 / 2) + '%"></span></span></td>' +
  '<td><span class="badge ' + status4 + '"></span></td>' +
  '</tr>';

var row5 = '<tr>' +
  '<td><span class="code">' + courseCodes[5] + '</span>' + courseNames[5] + '</td>' +
  '<td class="n">' + credits[5] + '</td>' +
  '<td class="n">' + practiceGrades[5] + '</td>' +
  '<td class="n">' + midtermGrades[5] + '</td>' +
  '<td class="n">' + finalGrades[5] + '</td>' +
  '<td class="n avg">' + average5 + '<span class="bar ' + status5 + '"><span style="width: ' + (tenths5 / 2) + '%"></span></span></td>' +
  '<td><span class="badge ' + status5 + '"></span></td>' +
  '</tr>';

var row6 = '<tr>' +
  '<td><span class="code">' + courseCodes[6] + '</span>' + courseNames[6] + '</td>' +
  '<td class="n">' + credits[6] + '</td>' +
  '<td class="n">' + practiceGrades[6] + '</td>' +
  '<td class="n">' + midtermGrades[6] + '</td>' +
  '<td class="n">' + finalGrades[6] + '</td>' +
  '<td class="n avg">' + average6 + '<span class="bar ' + status6 + '"><span style="width: ' + (tenths6 / 2) + '%"></span></span></td>' +
  '<td><span class="badge ' + status6 + '"></span></td>' +
  '</tr>';

var row7 = '<tr>' +
  '<td><span class="code">' + courseCodes[7] + '</span>' + courseNames[7] + '</td>' +
  '<td class="n">' + credits[7] + '</td>' +
  '<td class="n">' + practiceGrades[7] + '</td>' +
  '<td class="n">' + midtermGrades[7] + '</td>' +
  '<td class="n">' + finalGrades[7] + '</td>' +
  '<td class="n avg">' + average7 + '<span class="bar ' + status7 + '"><span style="width: ' + (tenths7 / 2) + '%"></span></span></td>' +
  '<td><span class="badge ' + status7 + '"></span></td>' +
  '</tr>';

var col0 = '<div class="col"><div class="track"><span style="height: ' + (cycleGpa[0] * 5) + '%"></span></div><b>' + cycleGpa[0].toFixed(2) + '</b><i>' + cycleLabels[0] + '</i></div>';
var col1 = '<div class="col"><div class="track"><span style="height: ' + (cycleGpa[1] * 5) + '%"></span></div><b>' + cycleGpa[1].toFixed(2) + '</b><i>' + cycleLabels[1] + '</i></div>';
var col2 = '<div class="col"><div class="track"><span style="height: ' + (cycleGpa[2] * 5) + '%"></span></div><b>' + cycleGpa[2].toFixed(2) + '</b><i>' + cycleLabels[2] + '</i></div>';
var col3 = '<div class="col"><div class="track"><span style="height: ' + (cycleGpa[3] * 5) + '%"></span></div><b>' + cycleGpa[3].toFixed(2) + '</b><i>' + cycleLabels[3] + '</i></div>';
var col4 = '<div class="col now"><div class="track"><span style="height: ' + (cycleGpa[4] * 5) + '%"></span></div><b>' + cycleGpa[4].toFixed(2) + '</b><i>' + cycleLabels[4] + '</i></div>';

var flags = '<li><span>Matrícula vigente</span><span class="flag ' + enrolled + '"></span></li>' +
            '<li><span>Documentos completos</span><span class="flag ' + documentsComplete + '"></span></li>' +
            '<li><span>Pagos al día</span><span class="flag ' + paymentsUpToDate + '"></span></li>' +
            '<li><span>Encuesta docente respondida</span><span class="flag ' + surveyDone + '"></span></li>';

var elAvatar = document.getElementById('avatar');
elAvatar.innerHTML = '<img src="img/avatar.png" alt="Avatar" width="76px" height="76px">';

var elName = document.getElementById('student-name');
elName.textContent = fullName;

var elTerm = document.getElementById('term-label');
elTerm.textContent = cycleName + ' · Periodo ' + term;

var elMeta = document.getElementById('student-meta');
elMeta.textContent = studentCode + ' · ' + career;

var elEmail = document.getElementById('student-email');
elEmail.textContent = email;

var elGpa = document.getElementById('kpi-gpa');
elGpa.textContent = gpa.toFixed(2);  

var elCredits = document.getElementById('kpi-credits');
elCredits.textContent = approvedCredits + ' / ' + totalCredits;

var elCourses = document.getElementById('kpi-courses');
elCourses.textContent = approvedCount + ' / ' + courseCount;

var elCoursesNote = document.getElementById('kpi-courses-note');
elCoursesNote.textContent = 'Desaprobados: ' + failedCount + ' · En curso: ' + inProgressCount;

var elProgress = document.getElementById('kpi-progress');
elProgress.textContent = progress.toFixed(0) + ' %';

var elMeter = document.getElementById('kpi-meter');
elMeter.innerHTML = '<span class="meter"><span style="width: ' + progress + '%"></span></span>';

var elProgressNote = document.getElementById('kpi-progress-note');
elProgressNote.textContent = creditsDone + ' de ' + creditsTotal + ' créditos';

var elTableTitle = document.getElementById('table-title');
elTableTitle.textContent = 'Notas del ' + cycleName + ' · ' + term;

var elTableNote = document.getElementById('table-note');
elTableNote.textContent = 'Promedio = práctica ' + (weightPractice * 10) + ' % + parcial ' + (weightMidterm * 10) +
                          ' % + final ' + (weightFinal * 10) + ' %. Nota mínima aprobatoria: ' + passingGrade +
                          '. Un curso sin las tres notas figura como En curso.';

var elRows = document.getElementById('course-rows');
elRows.innerHTML = row0 + row1 + row2 + row3 + row4 + row5 + row6 + row7;

var elChart = document.getElementById('cycle-chart');
elChart.innerHTML = col0 + col1 + col2 + col3 + col4;

var elFlags = document.getElementById('flag-list');
elFlags.innerHTML = flags;