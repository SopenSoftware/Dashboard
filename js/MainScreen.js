/**
 * Sopen
 * 
 * @package     SoVendorManager
 * @license     http://www.gnu.org/licenses/agpl.html AGPL Version 3
 * @author     
 * @copyright   
 * @version     $Id:  $
 *
 */ 
Ext.ns('Tine.Dashboard');

Tine.Dashboard.Application = Ext.extend(Tine.Tinebase.Application, {
    
    /**
     * Get translated application title of the calendar application
     * 
     * @return {String}
     */
    getTitle: function() {
        return this.i18n.ngettext('Dashboard', 'Dashboard', 1);
    }
});

Tine.Dashboard.MainScreen = Ext.extend(Tine.widgets.MainScreen, {
    
    lorem: '<div class="portlet-content">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</div>',
   
    getTools: function(){
        return [{
            xtype: 'tool',
            type: 'gear',
            handler: function(e, target, panelHeader, tool){
                var portlet = panelHeader.ownerCt;
                portlet.setLoading('Working...');
                Ext.defer(function() {
                    portlet.setLoading(false);
                }, 2000);
            }
        }];
    },
    
    show: function() {
        if(this.fireEvent("beforeshow", this) !== false){
            
            Tine.Tinebase.MainScreen.setCustomPanelMaxCenter('dashboard-portal-mainpanel',this.getCenterPanel());	        
            this.fireEvent('show', this);
        }
        return this;
    },
    
    onPortletClose: function(portlet) {
        this.showMsg('"' + portlet.title + '" was removed');
    },
    
    getCenterPanel: function(activeContentType) {
        
        var taskGrid = new Tine.Tasks.GridPanel({
            header:false,
            layout:'border',
            region:'center',
            height: 400,
            app: Tine.Tinebase.appMgr.get('Tasks')
        });
        taskGrid.initComponent();
        taskGrid.grid.getStore().load();
        
        var contactsGrid = new Tine.Addressbook.ContactGridPanel({
            layout: 'border',
            height: 400,
            app: Tine.Tinebase.appMgr.get('Addressbook')
        });
        contactsGrid.initComponent();
        contactsGrid.grid.getStore().load();

        var panel = {
            xtype: 'portal',
            id: 'app-portal',
            region: 'center',
            style:'padding: 0 5 5 5;', // pad the layout from the window edges
            items: [
                {
                    xtype: 'portalcolumn',
                    bodyStyle: 'margin:6px;',
                    columnWidth: 0.50,
                    items: [
                        {
                            xtype: 'portlet',
                            title: 'Firmenliste',
                            style: 'padding:10px 0 0px 10px',
                            height: 400,
                            tools: this.getTools(),
                            items: [
                                {
                                    xtype: 'panel',
                                    layout: 'fit',
                                    autoScroll: true,
                                    items: [
                                        contactsGrid
                                    ]
                                }
                            ],
                            listeners: {
                                scope: this,
                                close: this.onPortletClose
                            }
                        },{
                            xtype: 'portlet',
                            title: 'Widget',
                            style: 'padding:10px 0 0px 10px',
                            tools: this.getTools(),
                            items: [
                                {
                                    xtype: 'panel',
                                    layout: 'fit',
                                    autoScroll: true,
                                    html: this.lorem
                                }
                            ],
                            listeners: {
                                scope: this,
                                close: this.onPortletClose
                            }
                        }
                    ]
                },{
                    xtype:'portalcolumn',
                    bodyStyle:'margin:6px;',
                    columnWidth:0.50,
                    items: [
                        {
                            xtype: 'portlet',
                            title: 'Aufgaben',
                            style: 'padding:10px 0 0px 10px',
                            tools: this.getTools(),
                            items: [
                                taskGrid
                            ],
                            listeners: {
                                scope: this,
                                close: this.onPortletClose
                            }
                        }
                    ]
                },{
                    xtype: 'portalcolumn',
                    bodyStyle: 'margin:6px;',
                    columnWidth: 0.50,
                    items: [
                        {
                            xtype: 'portlet',
                            style: 'padding:10px 0 0px 10px',
                            title: 'Stock Portlet',
                            tools: this.getTools(),
                            html: this.lorem,
                            listeners: {
                                scope: this,
                                close: this.onPortletClose
                            }
                        }
                    ]
                }
            ]
        };
		
        return panel;
		
		
    }
});
