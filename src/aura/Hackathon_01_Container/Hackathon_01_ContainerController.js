({
	doInit : function(component, event, helper) {      
		helper.ServerCallMethod(component);
        helper.getAccountSource(component);
	},      
    onNew:function(component, event, helper) { 
        var createRecordEvent = $A.get("e.force:createRecord");
        createRecordEvent.setParams({
            "entityApiName": "Account"
        });
        createRecordEvent.fire();
        helper.ServerCallMethod(component);        
    },       
    onEdit:function(component, event, helper) {  
        	var recId=event.getSource().get("v.class");        
             component.set("v.editSelectedRecord",recId);
             component.set("v.isOpenNew",true);              
    },
    onClickHyperlink:function(component, event, helper) {
       		 var recId=event.target.id;
             component.set("v.selectedId",'');
             component.set("v.flag",false);
             component.set("v.selectedId",recId);
             component.set("v.flag",true);
    },
    onDelete:function(component, event, helper) {
        var type		='single';
     	var recIndex	=event.getSource().get("v.alternativeText");
     	var lis   		=component.get("v.ListForDelete");
        var mydat 		=component.get("v.mydata");
        if(!lis.includes(mydat[recIndex])){            
            lis.unshift(mydat[recIndex]);           
        }
        component.set("v.ListForDelete",lis);       
        helper.massDeleteMethod(component, event, helper,lis,type);
     	//helper.deleteMethod(component, event, helper,recId,lis);
    },
    onUpdateSource:function(component, event, helper) {
        var lis =component.get("v.ListForUpdateSource");
        if(lis.length > 0){
          component.set("v.isOpen", true);
        }else
        {
             var params={ "title": "Error!",mode: 'sticky',type: "error","message": "Please select the records to Update"};
           	  helper.showToasts(component, params, event);
        }
    },
    oncheckBox:function(component, event, helper) {
        var recIndex 	  	=event.getSource().get("v.name");        
        var checkedValue  	=event.getSource().get("v.value");        
        var lis   			=component.get("v.ListForUpdateSource");
        var mydat 			=component.get("v.mydata");
        if(checkedValue && !lis.includes(mydat[recIndex])){            
            lis.unshift(mydat[recIndex]);           
        }else if(!checkedValue && lis.includes(mydat[recIndex])){
            lis.shift(mydat[recIndex]); 
        }
       component.set("v.ListForUpdateSource",lis);       
    },   
   closeModel: function(component, event, helper) {
       component.set("v.isOpen", false);
   },    
    onSaveUpdateSource:function(component, event, helper) {
     	var lis =component.get("v.ListForUpdateSource");
        if(lis.length > 0){
   			helper.SaveMethod(component,event,helper);   
        }else{
            var params={ "title": "Error!",mode: 'sticky',type: "error","message": "Please select the records to Update"};
           	  helper.showToasts(component, params, event);
        }
        

   },
    onMassDelete:function(component, event, helper) {
     	var lis  =component.get("v.ListForUpdateSource");
        var type ='mass';
        if(lis.length > 0){
            helper.massDeleteMethod(component, event, helper,lis,type);
        }else{
              var params={ "title": "Error!",mode: 'sticky',type: "error","message": "Please select the records to delete"};
           	  helper.showToasts(component, params, event);
        }
      	
   },
    closeModelEdit: function(component, event, helper) {
       component.set("v.isOpenNew", false);
   },
    onSaveEdit:function(component, event, helper) {
       component.find("edit").get("e.recordSave").fire();
       helper.ServerCallMethod(component);
       component.set("v.isOpenNew", false);
       var emptyList=[];
       component.set("v.ListForUpdateSource",emptyList);   
      
   },   
    handleSaveSuccess : function(cmp, event) {
        // Display the save status
        cmp.set("v.saveState", "SAVED");
    }
})