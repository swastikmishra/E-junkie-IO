<?php

class EJParser{
	var $json_url = "https://s3.amazonaws.com/json.e-junkie.com/";
	var $clientId = null;
	var $products = array();
	var $availableTags = array();
	var $client = null;
	var $totalCount = 0;
	var $appliedTag = null;
	var $selectedProduct = null;
	var $validCall = false;
	var $relatedProducts = array();
	var $url = "";
	var $pref = null;
	var $totalPages = 1;
	var $currentPage = 1;
	var $size = 15;
	var $maxRelated = 0;

	function __construct($client, $tag, $item, $page){
		$this->clientId = intval($client);
		$this->json_url = $this->json_url.$this->clientId;
		if($tag != null)
			$this->appliedTag = urldecode($tag);
		if($item != null)
			$this->selectedProduct = $item;
		if($page->url)
			$this->url = ($page->url == "/" ? "/" : $page->url."/").$page->EJ->shop;
		$this->pref = $page->EJ->pref;
		if($page->pageNo)
			$this->currentPage = $page->pageNo-1;
		$this->maxRelated = $page->EJ->maxRelated;
		$this->fetchJSON();
	}	

	function fetchJSON(){
		if($this->clientId == 0)
			return false;

		// $ch = curl_init();
		// $timeout = 5;
		// curl_setopt($ch, CURLOPT_URL, $this->json_url);
		// curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
		// curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, $timeout);
		// $data = curl_exec($ch);
		// curl_close($ch);
		$data = file_get_contents($this->json_url);
		if($data != ""){
			$data = json_decode($data);
			$this->client = $data->client;
			$this->totalCount = $data->count;
			$temp_products = $data->items;
			$this->products = array();
			foreach($temp_products as $product){
				if($this->pref){
					if($this->pref->hide_out_of_stock && $product->out_of_stock) continue;
				}
				$product->name = htmlspecialchars($product->name, ENT_QUOTES, "UTF-8");
				$product->tagline = htmlspecialchars($product->tagline, ENT_QUOTES, "UTF-8");
				$this->products[] = $product;
			}
			
			$this->validCall = true;
			return true;
		}
		else return false;
	}

	function getSlug($str){
		return str_replace("%2F", "-", urlencode(str_replace(' ','-',$str)));
	}

	function getURL($product, $perma = false){
		if($perma)
			return $this->url."/product/".rawurlencode(utf8_encode($product->number));
		$url = $this->url."/product/".$product->number."/".$product->slug;
		return $url;	
	}

	function getAvailableTags(){	
		if(count($this->products) == 1){
			foreach($this->products[0]->tags as $tag)
				if(!in_array($tag, $this->availableTags) && strtolower($tag) != "all products")
					$this->availableTags[] = $tag;
		}
		else if($this->appliedTag){
			foreach($this->products as $product){
	                        foreach($product->tags as $tag){
        	                        if(!in_array($tag, $this->availableTags) && strtolower($tag) != "all products")
                		                $this->availableTags[] = $tag;
			        }
			}
        }else{
			foreach($this->products as $product){
				$tag = $product->tags[0];
				if(!in_array($tag, $this->availableTags) && strtolower($tag) != "all products")
					$this->availableTags[] = $tag;
			}
		}
	}

	function getProduct(){
		if($this->validCall){
			$temp_product = null;
			foreach($this->products as $product){
				if($product->number == $this->selectedProduct){
					$product->slug = $this->getSlug($product->name);
					$product->url = $this->getURL($product);
					$product->permalink = $this->getURL($product, true);
					$temp_product = $product;
					break;
				}
			}
			
			if (!$temp_product) { 
				$this->products = array();
				return false;
			}

			foreach($this->products as $product) {
				if (sizeof($temp_product->tags)) {
					foreach($temp_product->tags as $tag) {
						if(in_array($tag, $product->tags) && $product->number != $temp_product->number && !in_array($product, $this->relatedProducts)){
							$product->slug = $this->getSlug($product->name);
							$product->url = $this->getURL($product);
							$product->permalink = $this->getURL($product, true);
							$this->relatedProducts[] = $product;
						}
					}
				}
			}

			if($temp_product)
				$this->products = array($temp_product);
			else
				$this->products = array();
			$this->getAvailableTags();
			return true;
		}
		return false;
	}

	function getTagProducts(){
		if($this->validCall){
			$temp_array = array();
			foreach($this->products as $product){
				if($this->appliedTag){
					$t_tags = array();
					foreach($product->tags as $t) $t_tags[] = strtolower($t);
					if(!in_array(strtolower($this->appliedTag), $t_tags))
						continue;
				}
				$product->slug = $this->getSlug($product->name);
				$product->url = $this->getURL($product);
				$product->permalink = $this->getURL($product, true);
				$temp_array[] = $product;
			}
			$this->products = $temp_array;
			$this->getAvailableTags();
			return true;
		}
		return false;
	}

	function getProducts(){
		if($this->validCall){
			$this->getAvailableTags();
			$temp_array = array();
			$temp_products = $this->products;
			if($this->pref){
				if($this->pref->pinned && count($this->pref->pinned) > 0){
					$tmp_arr = array();
					foreach($this->products as $product){
						if(in_array($product->number, $this->pref->pinned))
							$tmp_arr[] = $product;
					}
					foreach($this->products as $product){
						if(!in_array($product, $tmp_arr))
							$tmp_arr[] = $product;
					}
					$this->products = $tmp_arr;
				}
				if($this->pref->pinned_down && count($this->pref->pinned_down) > 0){
                        $tmp_arr = array();
                        foreach($this->products as $product){
                                if(!in_array($product->number, $this->pref->pinned_down))
                                        $tmp_arr[] = $product;
                        }
                        foreach($this->products as $product){
                                if(!in_array($product, $tmp_arr))
                                        $tmp_arr[] = $product;
                        }
                        $this->products = $tmp_arr;
                }
			}	
			
			$this->totalCount = count($this->products);
			$this->totalPages = ceil($this->totalCount/$this->size);
			$this->products = array_slice($this->products, ($this->currentPage*$this->size), $this->size);

			foreach($this->products as $product){
				$product->slug = $this->getSlug($product->name);
				$product->url = $this->getURL($product);
				$product->permalink = $this->getURL($product, true);
				$temp_array[] = $product;
			}
			$this->products = $temp_array;
			return true;
		}
		return false;
	}

	function debugger($obj){
		echo "<pre>";
		print_r($obj);
		die();
	}

}
?>
