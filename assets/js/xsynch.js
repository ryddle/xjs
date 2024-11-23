class synchProcessManager{
	constructor(){
        if(SynchProcessManager!=null){return false;}
	}
	addSynchProcess(__id){
		this[__id]=new Object();
		this[__id].synchProcess=new synchProcess();
		this[__id].processSynchronizer=new processSynchronizer();
	}
	addMethod(__id,__object,__method, __args, __timeout){
		if(this[__id]==null){
			this[__id]=new Object();
			this[__id].synchProcess=new synchProcess();
			this[__id].processSynchronizer=new processSynchronizer();
		}
		this[__id].synchProcess.addMethod(__object,__method, __args, __timeout);
	}
	executeSynch(__id){
		if(this[__id]==null){return false;}
		this[__id].processIndex = this[__id].processSynchronizer.addSynchProcess(this[__id].synchProcess,"SynchProcessManager['"+__id+"'].processSynchronizer");
		this[__id].processSynchronizer.executeSynch(this[__id].processIndex);
	}
	existsProcess(__id){
		try{
			if(this[__id].processSynchronizer!=null)return true;
		}catch(e){return false;}
		return false;
	}
	notify(__id,__condition,__time_limit){
		if(__condition==null || __condition==""){
			this[__id].processSynchronizer.notify(this[__id].processIndex);
		}else{
			this[__id].processSynchronizer.validateAndNotify(this[__id].processIndex,__condition,__time_limit);
		}
	}
}

class synchProcess{
	constructor(){
		this.m_objects = new Array();
		this.m_methods = new Array();
		this.m_args = new Array();
		this.m_timeouts = new Array();
		this.m_synchindex = 0;
	}
	addMethod(_object, _method, _args, _timeout){
		this.m_objects.push(_object);
		this.m_methods.push(_method);
		this.m_args.push(_args);
		this.m_timeouts.push(_timeout);
	}
}

class processSynchronizer{
	constructor(){
		this.m_synch_process = new Array();
		this.m_observer = "";
		this.m_p_index = 0;
		this.m_recall = false;
		this.current_condition = "";
		this.validation_init = null;
		this.validation_time = 0;
	}
	addSynchProcess(_synch_process, _observer){
		if(_synch_process.m_methods.length!=null && _synch_process.m_methods.length>0){
			if(_synch_process.m_methods.length==_synch_process.m_args.length){
				this.m_observer = _observer;
				this.m_synch_process.push(_synch_process);
				return this.m_synch_process.length-1;
			}
		}else{
			alert("The provided parameters are not arrays");
		}
	}
	executeSynch(_pIndex){
		this.m_p_index = (typeof(_pIndex)!='undefined')?_pIndex:this.m_p_index;
		try{
			var m_synchp = this.m_synch_process[this.m_p_index];
			if(this.m_recall==true){
				window.setTimeout(this.m_observer+'.execute()', m_synchp.m_timeouts[m_synchp.m_synchindex]);
			}else{
				this.m_recall=true;
				window.setTimeout(this.m_observer+'.executeSynch()', 1);
			}
		}catch(ex){}
	}
	execute(){
		try{
			var m_synchp = this.m_synch_process[this.m_p_index];
			if(this.m_synch_process.length>0){
				if(m_synchp.m_synchindex<=m_synchp.m_methods.length){
					m_synchp.m_objects[m_synchp.m_synchindex][m_synchp.m_methods[m_synchp.m_synchindex]].apply(m_synchp.m_objects[m_synchp.m_synchindex], m_synchp.m_args[m_synchp.m_synchindex]);
				}
			}
		}catch(ex){}
	}
	notify(_pIndex){
		this.m_p_index = _pIndex;
		var m_synchp = this.m_synch_process[_pIndex];
		
		if(m_synchp.m_synchindex==m_synchp.m_methods.length-1){
			eval(this.m_observer+"= null");
		}
		
		if(m_synchp.m_synchindex<m_synchp.m_methods.length-1){
			m_synchp.m_synchindex++;
			this.executeSynch(_pIndex);
		}
	}
	validateAndNotify(__pIndex,__condition,__time_limit){
		this.m_p_index = (typeof(__pIndex)!='undefined')?__pIndex:this.m_p_index;
		this.current_condition = (typeof(__condition)!='undefined')?__condition:this.current_condition;
		this.time_limit = (typeof(__time_limit)!='undefined' && __time_limit!=null)?__time_limit*1000:this.time_limit;
		if(this.time_limit==null || typeof(this.time_limit)=='undefined')this.time_limit=10**10;
		if(this.validation_init==null){this.validation_init=new Date().getTime()}
		try{
			if(eval(this.current_condition)==true || this.validation_time>this.time_limit){
				this.m_recall=false;
				this.notify(this.m_p_index);
			}else{
				this.validation_time=new Date().getTime()-this.validation_init;
				window.setTimeout(this.m_observer+'.validateAndNotify()', 10);
			}
		}catch(e){
			window.setTimeout(this.m_observer+'.validateAndNotify()', 10);
		}
	}
}

var SynchProcessManager = new synchProcessManager();

/**
 * Example of synchronized tasks execution
 */

function Process01(){
	this.task1 = function(message, date){
		console.log("Executing Task 1:" + message + " today is " + date);
		SynchProcessManager.notify("process01");
	}

    this.task2 = function(){
		console.log("Executing Task 2");
		SynchProcessManager.notify("process01");
	}

    this.task3 = function(message){
		console.log("Executing Task 3:" + message);
		SynchProcessManager.notify("process01");
	}
}

var process01 = new Process01();

SynchProcessManager.addSynchProcess("process01");
SynchProcessManager.addMethod("process01", process01, "task1", ["hello world", new Date().toLocaleDateString()]);
SynchProcessManager.addMethod("process01", process01, "task2");
SynchProcessManager.addMethod("process01", process01, "task3", ["Bye world"]);

SynchProcessManager.executeSynch("process01");