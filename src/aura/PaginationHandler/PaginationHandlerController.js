({
	doInit : function(component, event, helper) {
		alert(component.get("v.PageLimit")+'==>'+component.get("v.maxLength"));
         var l=component.get("v.PageLimit");
        
        component.set("v.nextFiveButtonCounter",component.get("v.ButtonLimit"));
         var currentPage=1+(component.get("v.startPoint") * l);
         var lastPage=parseInt(component.get("v.maxLength") / l);
         component.set("v.lastPage",(lastPage+1));
        
        var buttonList=[];
        for(var i=0;i<component.get("v.maxLength");i++){
            if(i%l==0){
                    //console.log("-->"+i);
                    buttonList.push((i/l)+1);
                    //console.log(buttonList);
           }
        }
       console.log(buttonList);
       component.set("v.ButtonListMaster",buttonList);
      // console.log( component.get("v.ButtonListMaster"));
        if(buttonList.length > component.get("v.ButtonLimit")){
              component.set("v.nextFlag10",false);
        }
	},
    
    
    
    goPage:function(component, event, helpe){
        
        var pageNumber=Number(event.getSource().get("v.name"));
        var plimit=component.get("v.PageLimit");
        
        component.set("v.startPoint",(0+(pageNumber *plimit)));
        component.set("v.endPoint",(plimit+(pageNumber *plimit)));
        
         if(component.get("v.maxLength") <= component.get("v.endPoint")){
            component.set("v.nextFlag",true);
        }else{
            component.set("v.nextFlag",false);
        }
        if(component.get("v.startPoint") < component.get("v.PageLimit")){
            component.set("v.preFlag",true);
         }else{
            component.set("v.preFlag",false);
         }   
       
       
      var currentPage=1+parseInt(component.get("v.maxLength") % component.get("v.startPoint") );
      component.set("v.currentPage",(pageNumber+1));
        
    },
    next:function(component, event, helper) {
      var max=component.get("v.maxLength");
   
        var nextbutton = component.find('nex');
        
        var plimit=component.get("v.PageLimit");
        var st=component.get("v.startPoint");
        var ep=component.get("v.endPoint");
        component.set("v.startPoint",(st+plimit));
        component.set("v.endPoint",(ep+plimit));
        var st1=component.get("v.startPoint");
        var ep1=component.get("v.endPoint");
         
        if(max <= ep1){
     
            component.set("v.nextFlag",true);
           
        }
        else
        {
        
         }
        component.set("v.preFlag",false);
        
     var currentPage=parseInt(component.get("v.endPoint") / plimit );
     component.set("v.currentPage",currentPage);
        
        if(st1==(component.get("v.nextFiveButtonCounter")* plimit)){
              component.set("v.nextFiveButtonCounter",(component.get("v.nextFiveButtonCounter")+component.get("v.ButtonLimit")));        
        component.set("v.preFiveButtonCounter",(component.get("v.preFiveButtonCounter")+component.get("v.ButtonLimit")));
        
            component.set("v.preFlag10",false);
        }
         
      if(  component.get("v.ButtonListMaster").length <= component.get("v.nextFiveButtonCounter")){
               component.set("v.nextFlag10",true);
             
         }   
        
   },
    
    prev:function(component, event, helper) {
        var plimit=component.get("v.PageLimit");
       
        component.set("v.startPoint",(component.get("v.startPoint")-plimit));
        component.set("v.endPoint",(component.get("v.endPoint")-plimit));
     
	     
       if(component.get("v.startPoint") <= 0){
    		 component.set("v.preFlag",true); 
        }
        component.set("v.nextFlag",false);
        
   		 component.set("v.currentPage",(parseInt(component.get("v.endPoint") / plimit )));
     
         //-->Handling next 10 and Prev 10 buttons Starts
        if(component.get("v.endPoint") == (component.get("v.preFiveButtonCounter")* plimit)){
        component.set("v.nextFiveButtonCounter",(component.get("v.nextFiveButtonCounter")-component.get("v.ButtonLimit")));        
        component.set("v.preFiveButtonCounter",(component.get("v.preFiveButtonCounter")-component.get("v.ButtonLimit")));
        component.set("v.nextFlag10",false);
            
        }
          if(component.get("v.preFiveButtonCounter") == 0){
               component.set("v.preFlag10",true);
             
         }
    	// Handling next 10 and Prev 10 buttons Ends
	},
   
    next10buttons:function(component, event, helper) {
        var plimit=component.get("v.PageLimit");  
        
        if(component.get("v.nextFiveButtonCounter") < component.get("v.ButtonListMaster").length){  
           //set the range for new set of buttons  
        component.set("v.nextFiveButtonCounter",(component.get("v.nextFiveButtonCounter")+component.get("v.ButtonLimit")));        
        component.set("v.preFiveButtonCounter",(component.get("v.preFiveButtonCounter")+component.get("v.ButtonLimit")));
        component.set("v.preFlag10",false);
           //change start and end parameters accordingly     
        
        component.set("v.startPoint",(plimit * component.get("v.preFiveButtonCounter")));
        component.set("v.endPoint",(plimit+(plimit * component.get("v.preFiveButtonCounter"))));
             
        }else{
            console.log("out i of the bound ");
            
        }
      if(  component.get("v.ButtonListMaster").length <= component.get("v.nextFiveButtonCounter")){
               component.set("v.nextFlag10",true);
             
         }
     var currentPage=parseInt(component.get("v.endPoint") / plimit );
     component.set("v.currentPage",currentPage);
    },
     pre10buttons:function(component, event, helper) {
        var plimit=component.get("v.PageLimit");   
         
        if(component.get("v.preFiveButtonCounter") > 0){
        //set the range for new set of buttons   
        component.set("v.nextFiveButtonCounter",(component.get("v.nextFiveButtonCounter")-component.get("v.ButtonLimit")));        
        component.set("v.preFiveButtonCounter",(component.get("v.preFiveButtonCounter")-component.get("v.ButtonLimit")));
        component.set("v.nextFlag10",false);    
        
              
      //change start and end parameters accordingly 
        component.set("v.startPoint",(plimit * component.get("v.preFiveButtonCounter")));
        component.set("v.endPoint",(plimit+(plimit * component.get("v.preFiveButtonCounter"))));
           
          }else {
                  console.log("out iof the bound ");
              
          }
         if(component.get("v.preFiveButtonCounter") == 0){
               component.set("v.preFlag10",true);
             
         }
          component.set("v.currentPage",(parseInt(component.get("v.endPoint") / plimit )));
     }
})