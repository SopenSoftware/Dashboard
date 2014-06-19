<?php
class Dashboard_Frontend_Json extends Tinebase_Frontend_Json_Abstract{
    protected $_controller = NULL;

    protected $_config = NULL;
    protected $_userTimezone = null;
    protected $_serverTimezone = null;
    
    /**
     * the constructor
     *
     */
    public function __construct()
    {
        $this->_applicationName = 'Dashboard';
    }
}

?>