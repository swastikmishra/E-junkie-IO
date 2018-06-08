<?php
function createCSRFToken(){
	if(isset($_SESSION['csrf']));
	else $_SESSION['csrf'] = md5("__EJIO__".time().mt_rand(1,1000));
}

if($match['name'] == "api" || $match['name'] == "api2"){
	session_start();
	require_once 'apiHandler.php';
	die();	
}

if($match['name'] == "admin"){
	session_start();
	createCSRFToken();
	
	if($match['params']['param'] == "logout")
		unset($_SESSION['EJIO_user']);

	if(isset($_SESSION['EJIO_user'])) //user is logged in
		require_once 'admin/index.html';
	else{ //show login
		if(isset($_POST['login']) || isset($_POST['register']))
			require_once 'admin/loginHandler.php';
		require_once 'admin/login.php';
	}
	die();
}

/*incase we get /home in request, its better to forwar it to / with 301 to avoid duplicate content*/
if($match['params']['page'] == "home"){
	header('Location: http://'.$_SERVER['HTTP_HOST'], true, 301);
}

$Api = new Api($Page->user, false);

if($Page->url != "/"){
	$Page->url = "/".$Page->url;
	$Page->url = substr($Page->url, 0, -1);
}
$Page->name = null;

switch ($match['name']){
	case 'home' 	: $Page->name = $Page->site->home; break;
	case 'static'	: $Page->name = $match['params']['page']; break;
	case 'staticP'	: $Page->name = $match['params']['page']; $Page->pageNo = $match['params']['pageNo']; break;
	case 'shopP'	: $Page->name = "shop"; 
	case 'shop'		: $Page->name = "shop"; 
					  $Page->type = "shop";
					  break;
	case 'tags'		: $Page->name = "shop";
					  $Page->type = "tags";
					  $Page->EJ->selectedCategory = $match['params']['tag']; 
					  break;
	case 'product'	: $Page->name = "product";
					  $Page->type = "product";
					  $Page->EJ->selectedProduct = $match['params']['item'];
					  break;
	default 		: $Page->name = "404"; break;
}

$EJ = null;
if(($Page->name == "shop" || $Page->name == "product") && $Page->EJ != null){
	if($match['params']['page'] == null)
		$Page->pageNo = 1;
	else
		$Page->pageNo = intval($match['params']['page']);
	if($Page->pageNo == 0) $Page->pageNo++;
	$EJ = new EJParser($Page->EJ->clientId, $Page->EJ->selectedCategory, $Page->EJ->selectedProduct, $Page);
}

$EJT = new EJTemplate($Page, $Api, $EJ);

if(($Page->name == "shop" || $Page->name == "product") && $EJ != null){
	if($Page->type == 'shop')
		$EJ->getProducts();
	else if($Page->type == 'tags')
		$EJ->getTagProducts();
	else if($Page->type == 'product'){
		$EJ->getProduct();
		if(count($EJ->products) == 0) show404();
	}
	$EJT->generateShop();
}else{
	$EJT->generateStatic();
}