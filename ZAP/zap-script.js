// Пример скрипта для ZAP
var targetUrl = "http://89.169.164.174; // Замените на URL вашего приложения
var scanPolicyName = "Default Policy"; // Используемая политика сканирования

// Инициализация ZAP
print("Initializing ZAP...");
var client = new org.zaproxy.clientapi.core.ClientApi("localhost", 80);

// Запуск сканирования
print("Starting active scan for: " + targetUrl);
var scanId = client.ascan.scan(targetUrl, null, null, null, null, scanPolicyName);

// Ожидание завершения сканирования
print("Waiting for scan to complete...");
while (true) {
    var status = client.ascan.status(scanId);
    print("Scan progress: " + status + "%");
    if (status >= 100) {
        break;
    }
    java.lang.Thread.sleep(5000); // Пауза 5 секунд
}

// Генерация отчетов
print("Generating reports...");
var reportDir = "/home/runner/work/park/park/zap-reports";
client.reports.generate(targetUrl, "traditional-html", null, reportDir + "/zap-report.html");
client.reports.generate(targetUrl, "markdown", null, reportDir + "/zap-report.md");

print("Scan completed and reports generated.");
