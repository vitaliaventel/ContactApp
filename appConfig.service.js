(function () {
    var module = angular.module("ContactApp");

    module.service("AppDataServiceService", function (AppNameService) {
        this.name = AppNameService;
        this.author = "Vitalii";
        this.builtDate = new Date().toDateString();
    });
})();
