<?php
header("Access-Control-Allow-Origin: http://localhost:8080");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Expose-Headers: Access-Control-Allow-Origin");	

function show404(){
	global $EJT;
	header("HTTP/1.1 404 Not Found");
	$EJT->page->name = "error";
	$EJT->generateStatic();
	die();
}

require_once './EJIO/Scripts/AltoRouter.php';
require_once './EJIO/Scripts/EJParser.php';
require_once './EJIO/Scripts/EJTemplate.php';
require_once './EJIO/Scripts/Api.php';

$WebsitesAvailable = json_decode(file_get_contents("websites.json"));
$tmpWebsiteName = $_SERVER['HTTP_HOST'];
$tmpWebsiteName = explode(".", $tmpWebsiteName);
if(count($tmpWebsiteName) == 2){
        $tmpWebsiteName = $tmpWebsiteName[0].".".$tmpWebsiteName[1];
}else{
        $tmpWebsiteName = $tmpWebsiteName[1].".".$tmpWebsiteName[2];
}
$WebsiteRequested = $tmpWebsiteName;

$Website = null;
if($WebsitesAvailable->{$WebsiteRequested}){
	$Website = $WebsitesAvailable->{$WebsiteRequested}->user;
	$Website = json_decode(file_get_contents("./Users/$Website.json"));
}

if($Website == null) die("Website not found");

if($Website){
	$Page = new stdClass();
	$Page->url = "/"; //base url or sub-folder name
	$Page->user = $Website->username;
	$Page->location->templates = "./UsersTemplates/".$Page->user;
	$Page->location->pages = "./UsersPages/".$Page->user;
	$Page->location->static = "./UsersTemplates/".$Page->user;

	$Page->site = $Website->website;
	$Page->site->url = ($Page->ssl ? "https://" : "http://").$Page->site->domain;

	$Page->EJ = null;
	if($Website->integrations->ejunkie->enabled === true){
		$Page->EJ = $Website->integrations->ejunkie;
		$Page->EJ->selectedCategory = null;
		$Page->EJ->selectedProduct = null;
		$Page->EJ->showTags = true;
		$Page->EJ->showSearch = true;
	}

	$router = new AltoRouter();
	$router->setBasePath("");

	if($Page->EJ){
		$router->map( 'GET', "/".$Page->EJ->shop."/[i:page]?", null, 'shop');
		$router->map( 'GET', "/".$Page->EJ->shop, null, 'shopP');
		$router->map( 'GET', "/".$Page->EJ->shop."/tags/[*:tag]", null, 'tags');
		$router->map( 'GET', "/".$Page->EJ->shop."/".$Page->EJ->product."/[*:item]/[*:slug]?", null, 'product');
	}

	$router->map( 'GET', '/', null, 'home');
	$router->map( 'GET|POST', '/admin/[*:param]?', null, 'admin');
	$router->map( 'POST|OPTIONS', '/api/[:endpoint]?/[:param]?', null, 'api');
	$router->map( 'POST|OPTIONS', '/api', null, 'api2');
	$router->map( 'GET', '/[*:page]/[i:pageNo]?', null, 'staticP');
	$router->map( 'GET', '/[*:page]', null, 'static');

	$match = $router->match();
	if($match)
		 require 'routeHandler.php';
	else
		show404();
}