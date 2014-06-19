<?php


/**
 * This class handles all Http requests for the SoVendorManager application
 *
 * @package     SoVendorManager
 * @subpackage  Frontend
 */
class Dashboard_Frontend_Http extends Tinebase_Frontend_Http_Abstract
{
    protected $_applicationName = 'Dashboard';
    
    /**
     * Returns all JS files which must be included for this app
     *
     * @return array Array of filenames
     */
    public function getJsFilesToInclude()
    {
        return array(
            'Dashboard/js/MainScreen.js',
       );
    }
    
    public function getCssFilesToInclude(){
    	return array(
    		'Dashboard/css/Dashboard.css'
    	);
    }
}
