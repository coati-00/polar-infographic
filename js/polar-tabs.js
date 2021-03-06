Columns = function(){
    this.init = function(){

        url = 'https://spreadsheets.google.com/feeds/list/1rqeGy7IU7wHK5QPUzanPXr85VGwPVwa2-kmUh2is43o/od6/public/values?alt=json';
        jQuery.getJSON(url, function(data) {

          for (i = 0; i < 8; i++) { 
              var proj_name = 'gsx$projectname' + String( i + 1 );
              
              initColumn.addColumn(data.feed.entry[3][proj_name],
                                   data.feed.entry[4][proj_name],
                                   data.feed.entry[5][proj_name],
                                   data.feed.entry[6][proj_name],
                                   data.feed.entry[0][proj_name],
                                   data.feed.entry[1][proj_name],
                                   data.feed.entry[0][proj_name],
                                   data.feed.entry[7][proj_name]);
              
          }

        }).always(function()
        {
            initColumn.reorderColumns(0, 1);
            initColumn.showColumns();
            timer = window.setInterval(function() {
                var current_tab = jQuery('.nav-tabs .active');
                var current_tab_num = jQuery('.nav-tabs .active').data().tabNum;
                var current_pane = ".tab-" + String(current_tab_num) + "-pane";
                var next_tab_num = parseInt(current_tab_num) + 1;

                if (next_tab_num === 5)
                {
                    next_tab_num = 1;
                }
            
                var next_tab = ".tab-" + String(next_tab_num);
                var next_pane = ".tab-" + String(next_tab_num) + "-pane";

            	if(jQuery('.column:hover').length){
                    return;
            	}
            	if(jQuery('.tree-graph-nav li:hover').length){
                    return;
            	}

                initColumn.reorderColumns(next_tab, next_tab_num);
                jQuery(current_tab).toggleClass("active");
                jQuery(current_pane).toggleClass("active");
                jQuery(next_tab).toggleClass("active");
                jQuery(next_pane).toggleClass("active");
          }, 2000);
      });//end of get json always
    };

     this.showColumns = function(){
      jQuery('.polar-explorer.tab-content').show();
    };

    this.reorderColumns = function(active_tab, active_num){
        
    	if(jQuery('.column:hover').length){
            return;
    	}
    	if(jQuery('.tree-graph-nav li:hover').length){
            return;
    	}

        for (i = 0; i < this.columnArray.length; i++) { 
        	var tab_num = 'tab_' + String(active_num);
        	var tab_pane = 'div#tab-' + String(active_num) + '-container';
        	var current_column_order = this.columnArray[i]['position'][tab_num];
            var column_num = ' div.column-' + String(current_column_order);
            var exp = String(tab_pane + column_num);
            var ct = " div.column-title";
            var cp = " div.column-pic";
            var cc = " div.column-content";
            var link = " div.column-link";
            jQuery(exp + ct).text(this.columnArray[i]['title']);
            jQuery(exp + cp).text(this.columnArray[i]['image']);
            jQuery(exp + cc).text(this.columnArray[i]['text']);
            var nl = String(this.columnArray[i]['link']);
            jQuery(exp + link).text(this.columnArray[i]['link']);
            jQuery(exp + link).data().link = this.columnArray[i]['link'];
        }

    };

    this.columnArray = [];
    
    this.addColumn = function(tab_one, tab_two, tab_three, tab_four, new_title, pic, content, link){
    	
    	var json_obj = { position: {tab_1: tab_one['$t'], tab_2: tab_two['$t'], tab_3: tab_three['$t'], tab_4: tab_four['$t']}, title: new_title['$t'], image: pic['$t'], text: content['$t'], link: link['$t']};
    	this.columnArray.push(json_obj);
    	
    };
    
    this.init();

}//end Columns

jQuery(document).ready(function() {

   window.initColumn = new Columns(); 
   
	jQuery('.column').on('click', jQuery('div.column-link'), function(event) {
		var link = jQuery(this).children('div.column-link').data().link;  
		document.location = link;
	});
	
	jQuery('.tree-graph-nav li').on('hover', jQuery('.tree-graph-nav li'), function(event) {
		var act_tab = jQuery('.tree-graph-nav li.active');
		var act_pane = jQuery('div.polar-explorer div.tab-pane.active');
		act_tab.removeClass('active');
		act_pane.removeClass('active');
		jQuery(this).addClass("active");
		var num = jQuery(this).data('tabNum');
        var pane = '.tab-' + String(num) + '-pane';
        jQuery(pane).addClass("active");
	});
	
	
	jQuery('.tree-graph-nav li').on('hover', jQuery('.tree-graph-nav li'), function(event) {
		var act_tab = jQuery('.tree-graph-nav li.active');
		var act_pane = jQuery('div.polar-explorer div.tab-pane.active');
		act_tab.removeClass('active');
		act_pane.removeClass('active');
		jQuery(this).addClass("active");
		var num = jQuery(this).data('tabNum');
        var pane = '.tab-' + String(num) + '-pane';
        jQuery(pane).addClass("active");
        window.clearInterval(timer);
	});
   
});