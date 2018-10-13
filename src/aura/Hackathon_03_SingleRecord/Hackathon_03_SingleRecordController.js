({
	onDelete : function(component, event, helper) {
		 component.find("recordHandler").deleteRecord($A.getCallback(function(deleteResult) {
			if (deleteResult.state === "SUCCESS" || deleteResult.state === "DRAFT") {           
        	var compEvent = component.getEvent("selectIdEvt");
			compEvent.setParams({"selectedNodeId" : null ,
                              	  "mode" : 'delete'
                            });
            compEvent.fire();
                
            } else if (deleteResult.state === "INCOMPLETE") {
                console.log("User is offline, device doesn't support drafts.");
            } else if (deleteResult.state === "ERROR") {
                console.log('Problem deleting record, error: ' + JSON.stringify(deleteResult.error));
            } else {
                console.log('Unknown problem, state: ' + deleteResult.state + ', error: ' + JSON.stringify(deleteResult.error));
            }
        }));       
	},
    onClickHyperlink:function(component, event, helper) { 
        var compEvent = component.getEvent("selectIdEvt");
		compEvent.setParams({"selectedNodeId" : component.get("v.singleNode.Id") ,
                             "mode":'detail'
                            });        
        compEvent.fire();
    },
     onEdit:function(component, event, helper) {   
            var editRecordEvent = $A.get("e.force:editRecord");
            editRecordEvent.setParams({
                 "recordId": component.get("v.singleNode.Id")
           });
           editRecordEvent.fire();
        var compEvent = component.getEvent("selectIdEvt");
		compEvent.setParams({"selectedNodeId" : component.get("v.singleNode.Id") ,
                             "mode":'refresh'
                            });        
        compEvent.fire();
     }
})