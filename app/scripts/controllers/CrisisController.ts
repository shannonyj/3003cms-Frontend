// TypeScript
class CrisisController{
    rootDjangoUrl: string = 'http://127.0.0.1:8000';
    approveCrisis(id){
        $.get(rootDjangoUrl + '/approveCrisis/' + id + '/');
    }
    getPublicMap(callback){
        
    }
    getApprovedMap(callback){
    
    }
    getReportingMap(callback){
    
    }
}