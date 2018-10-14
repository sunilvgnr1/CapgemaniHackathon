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
        	var recId=event.getSource().get("v.alternativeText"); 
            var editRecordEvent = $A.get("e.force:editRecord");
            editRecordEvent.setParams({
                 "recordId": recId
           });
        editRecordEvent.fire();
        window.setTimeout(
    		$A.getCallback(function() {
        		  helper.ServerCallMethod(component);
                  $A.get('e.force:refreshView').fire();
    			}), 15000
			);
               
    },
    onClickHyperlink:function(component, event, helper) {
       		 var recId=event.target.id;
             component.set("v.selectedId",'');
             component.set("v.flag",false);
             component.set("v.selectedId",recId);
             component.set("v.flag",true);
    },
    onDelete:function(component, event, helper) {
     	var recId=event.getSource().get("v.alternativeText");
     	helper.deleteMethod(component, event, helper,recId,'singleRecord');
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
     	var lis =component.get("v.ListForUpdateSource");
        if(lis.length > 0){
            helper.massDeleteMethod(component, event, helper);
        }else{
              var params={ "title": "Error!",mode: 'sticky',type: "error","message": "Please select the records to delete"};
           	  helper.showToasts(component, params, event);
        }
      	
   }
    
})