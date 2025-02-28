var target = "http://89.169.164.174:80";  // целевой URL
var zap = new Packages.org.zaproxy.zap.ZAP();
var spider = zap.spider.scan(target, null, null, null, null);
var activeScan = zap.ascan.scan(target, null, null, null, null, null, null);
