<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Headers: Content-Type, file_name, p_id,u_id,u_name,u_num,u_pass,imgSr,b_id,md_name,cat_name,dis_id,u_email,u_address,u_dis_id,u_up_id,bid_amount,bid_type,bidf_type,bid_rs_team_id,'ca_order','cre_order',pageNumber,limit,grade");
// echo ($_GET['file_name']) ;

$fileName = $_GET['file_name'];

if ($fileName == 'home_helping_data') {
	$curl = curl_init('http://202.40.181.98:9090/resale/web_api/version_1_0_1/home_helping_data.php');
	// Set HTTP Header for POST request 
	curl_setopt(
		$curl,
		CURLOPT_HTTPHEADER,
		array(
			'Content-Typ:e application/json',
			'sis_id: 1'
		)
	);
}
if ($fileName == 'client_contact') {
	$curl      = curl_init('http://202.40.181.98:9090/resale/web_api/version_1_0_1/client_contact.php');
	$inputJSON = file_get_contents('php://input');
	$input     = json_decode($inputJSON, true);
	$postData  = [
		'name'    => $input['name'] ?? null,
		'mobile'  => $input['mobile'] ?? null,
		'message' => $input['message'] ?? null,
	];

	// Set the data to be sent in the body
	curl_setopt($curl, CURLOPT_POSTFIELDS, json_encode($postData));

	// Set HTTP Header for POST request
	curl_setopt(
		$curl,
		CURLOPT_HTTPHEADER,
		array(
			'Content-Type: application/json',
			'sis_id: 1',
		)
	);

}

if ($fileName == 'product_grade') {
	$curl = curl_init('http://202.40.181.98:9090/resale/web_api/version_1_0_1/pro_grade.php');
	// Set HTTP Header for POST request 
	curl_setopt(
		$curl,
		CURLOPT_HTTPHEADER,
		array(
			'Content-Typ:e application/json',
			'sis_id: 1'
		)
	);
}
if ($fileName == 'client_comments') {
	$curl = curl_init('http://202.40.181.98:9090/resale/web_api/version_1_0_1/client_comments.php');
	// Set HTTP Header for POST request 
	curl_setopt(
		$curl,
		CURLOPT_HTTPHEADER,
		array(
			'Content-Typ:e application/json',
			'sis_id: 1'
		)
	);
}
else if ($fileName == 'product_list') {
	$curl = curl_init('http://202.40.181.98:9090/resale/web_api/version_1_0_1/product_list.php');
	// Set HTTP Header for POST request 
	$limit = $_GET['limit'] ? $_GET['limit'] : null;
	curl_setopt(
		$curl,
		CURLOPT_HTTPHEADER,
		array(
			'Content-Type: application/json',
			'sis_id: 1',
			'limit:' . $limit

		)
	);
}
else if ($fileName == 'view_all_product_list') {
	$curl         = curl_init('http://202.40.181.98:9090/resale/web_api/version_1_0_1/view_all_product_list.php');
	$brand_id     = $_GET['b_id'] ? $_GET['b_id'] : null;
	$cash_order   = $_GET['ca_order'] ? $_GET['ca_order'] : null;
	$credit_order = $_GET['cre_order'] ? $_GET['cre_order'] : null;
	$pageNumber   = $_GET['pageNumber'] ? $_GET['pageNumber'] : null;
	$limit        = $_GET['limit'] ? $_GET['limit'] : null;
	$grade        = $_GET['grade'] ? $_GET['grade'] : null;

	// Set HTTP Header for POST request 
	curl_setopt(
		$curl,
		CURLOPT_HTTPHEADER,
		array(
			'Content-Type: application/json',
			'sis_id: 1',
			'brand_id: ' . $brand_id,
			'cash_sort_order: ' . $cash_order,
			'credit_sort_order: ' . $credit_order,
			'pageNumber:' . $pageNumber,
			'limit:' . $limit,
			'grade:' . $grade,

		)
	);


}
else if ($fileName == 'search_list') {
	$curl         = curl_init('http://202.40.181.98:9090/resale/web_api/version_1_0_1/model_wise_product.php');
	$model_name   = $_GET['md_name'];
	$brand_id     = $_GET['b_id'];
	$cash_order   = $_GET['ca_order'] ? $_GET['ca_order'] : null;
	$credit_order = $_GET['cre_order'] ? $_GET['cre_order'] : null;
	$pageNumber   = $_GET['pageNumber'] ? $_GET['pageNumber'] : null;
	$limit        = $_GET['limit'] ? $_GET['limit'] : null;
	$grade        = $_GET['grade'] ? $_GET['grade'] : null;

	curl_setopt(
		$curl,
		CURLOPT_HTTPHEADER,
		array(
			'Content-Type: application/json',
			'sis_id: 1',
			'model_name: ' . $model_name,
			'brand_id: ' . $brand_id,
			'cash_sort_order: ' . $cash_order,
			'credit_sort_order: ' . $credit_order,
			'pageNumber:' . $pageNumber,
			'limit:' . $limit,
			'grade:' . $grade,
		)
	);
}
else if ($fileName == 'product_details') {
	$curl       = curl_init('http://202.40.181.98:9090/resale/web_api/version_1_0_1/product_details.php');
	$product_id = $_GET['p_id'];
	// Set HTTP Header for POST request 
	curl_setopt(
		$curl,
		CURLOPT_HTTPHEADER,
		array(
			'Content-Type: application/json',
			'sis_id: 1',
			'product_id: ' . $product_id
		)
	);
}
else if ($fileName == 'bid_entry') {
	$curl           = curl_init('http://202.40.181.98:9090/resale/web_api/version_1_0_1/bid_entry.php');
	$user_id        = $_GET['u_id'];
	$product_id     = $_GET['p_id'];
	$bid_amount     = $_GET['bid_amount'];
	$bid_type       = $_GET['bid_type'];
	$bid_ref_type   = $_GET['bidf_type'];
	$bid_rs_team_id = $_GET['bid_rs_team_id'];

	// Set HTTP Header for POST request 
	curl_setopt(
		$curl,
		CURLOPT_HTTPHEADER,
		array(
			'Content-Type: application/json',
			'sis_id: 1',
			'product_id: ' . $product_id,
			'user_id: ' . $user_id,
			'bid_amount: ' . $bid_amount,
			'bid_type: ' . $bid_type,
			'bid_ref_type: ' . $bid_ref_type,
			'bid_rs_team_id: ' . $bid_rs_team_id,
		)
	);
}
else if ($fileName == 'cat_list') {
	$curl     = curl_init('http://202.40.181.98:9090/resale/web_api/version_1_0_1/pro_brand_wise_cat.php');
	$brand_id = $_GET['b_id'];
	curl_setopt(
		$curl,
		CURLOPT_HTTPHEADER,
		array(
			'Content-Type: application/json',
			'sis_id: 1',
			'brand_id: ' . $brand_id
		)
	);
}
else if ($fileName == 'model_list') {
	$curl     = curl_init('http://202.40.181.98:9090/resale/web_api/version_1_0_1/pro_cat_wise_model.php');
	$cat_name = $_GET['cat_name'];
	curl_setopt(
		$curl,
		CURLOPT_HTTPHEADER,
		array(
			'Content-Type: application/json',
			'sis_id: 1',
			'category: ' . $cat_name
		)
	);
}
else if ($fileName == 'brand_wise_product_list') {
	$curl     = curl_init('http://202.40.181.98:9090/resale/web_api/version_1_0_1/brand_wise_product_list.php');
	$brand_id = $_GET['b_id'];

	curl_setopt(
		$curl,
		CURLOPT_HTTPHEADER,
		array(
			'Content-Type: application/json',
			'sis_id: 1',
			'brand_id: ' . $brand_id
		)
	);
}
else if ($fileName == 'user_login') {
	$curl         = curl_init('http://202.40.181.98:9090/resale/web_api/version_1_0_1/user_login.php');
	$mobileNumber = $_GET['u_num'];
	$password     = $_GET['u_pass'];
	// Set HTTP Header for POST request 
	curl_setopt(
		$curl,
		CURLOPT_HTTPHEADER,
		array(
			'Content-Type: application/json',
			'sis_id: 1',
			'mobile: ' . $mobileNumber,
			'password: ' . $password,
		)
	);
}
else if ($fileName == 'forgot_password') {
	$curl         = curl_init('http://202.40.181.98:9090/resale/web_api/version_1_0_1/forget_password.php');
	$mobileNumber = $_GET['u_num'];
	// Set HTTP Header for POST request 
	curl_setopt(
		$curl,
		CURLOPT_HTTPHEADER,
		array(
			'Content-Type: application/json',
			'sis_id: 1',
			'mobile: ' . $mobileNumber,
		)
	);
}
else if ($fileName == 'user_registration') {
	$curl         = curl_init('http://202.40.181.98:9090/resale/web_api/version_1_0_1/user_registration.php');
	$name         = $_GET['u_name'];
	$mobileNumber = $_GET['u_num'];
	$password     = $_GET['u_pass'];
	$otp          = $_GET['u_otp'];

	// Set HTTP Header for POST request 
	curl_setopt(
		$curl,
		CURLOPT_HTTPHEADER,
		array(
			'Content-Type: application/json',
			'sis_id: 1',
			'name: ' . $name,
			'mobile: ' . $mobileNumber,
			'pass: ' . $password,
			'otp: ' . $otp,
		)
	);
}
else if ($fileName == 'send_otp') {
	$curl         = curl_init('http://202.40.181.98:9090/resale/web_api/version_1_0_1/send_otp.php');
	$mobileNumber = $_GET['u_num'];
	// Set HTTP Header for POST request 
	curl_setopt(
		$curl,
		CURLOPT_HTTPHEADER,
		array(
			'Content-Type: application/json',
			'sis_id: 1',
			'mobile: ' . $mobileNumber,
		)
	);
}
else if ($fileName == 'pass_change') {
	$curl   = curl_init('http://202.40.181.98:9090/resale/web_api/version_1_0_1/user_password_update.php');
	$u_id   = $_GET['u_id'];
	$u_pass = $_GET['u_pass'];

	// Set HTTP Header for POST request 
	curl_setopt(
		$curl,
		CURLOPT_HTTPHEADER,
		array(
			'Content-Type: application/json',
			'sis_id: 1',
			'user_id: ' . $u_id,
			'new_pass: ' . $u_pass,
		)
	);
}
else if ($fileName == 'upazila') {
	$curl   = curl_init('http://202.40.181.98:9090/resale/web_api/version_1_0_1/district_to_upazila.php');
	$dis_id = $_GET['dis_id'];

	// Set HTTP Header for POST request 
	curl_setopt(
		$curl,
		CURLOPT_HTTPHEADER,
		array(
			'Content-Type: application/json',
			'sis_id: 1',
			'district_id: ' . $dis_id,
		)
	);
}
else if ($fileName == 'user_profile') {
	$curl = curl_init('http://202.40.181.98:9090/resale/web_api/version_1_0_1/user_profile.php');
	$u_id = $_GET['u_id'];

	// Set HTTP Header for POST request 
	curl_setopt(
		$curl,
		CURLOPT_HTTPHEADER,
		array(
			'Content-Type: application/json',
			'sis_id: 1',
			'user_id: ' . $u_id,
		)
	);
}
else if ($fileName == 'user_profile_update') {
	$curl      = curl_init('http://202.40.181.98:9090/resale/web_api/version_1_0_1/user_profile_update.php');
	$u_id      = $_GET['u_id'];
	$u_name    = $_GET['u_name'];
	$u_email   = $_GET['u_email'];
	$u_address = $_GET['u_address'];
	$u_dis_id  = $_GET['u_dis_id'];
	$u_up_id   = $_GET['u_up_id'];

	// Set HTTP Header for POST request 
	curl_setopt(
		$curl,
		CURLOPT_HTTPHEADER,
		array(
			'Content-Type: application/json',
			'sis_id: 1',
			'user_id: ' . $u_id,
			'name: ' . $u_name,
			'email: ' . $u_email,
			'address: ' . $u_address,
			'district_id: ' . $u_dis_id,
			'upazila_id: ' . $u_up_id,
		)
	);
}
else if ($fileName == 'img_src') {
	$imgSr = $_GET['imgSr'];
	$curl  = curl_init('http://202.40.181.98:9090/' . $imgSr);

	curl_setopt(
		$curl,
		CURLOPT_HTTPHEADER,
		array(
			'Content-Type: image/*',
			'sis_id: 1',
		)
	);
	curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false);

	$output = curl_exec($curl);
	// echo $output;
	if ($output === false) {
		echo 'Curl error: ' . curl_error($curl);
	}
	else {
		$contentType = curl_getinfo($curl, CURLINFO_CONTENT_TYPE);
		header('Content-Type: ' . $contentType);
		echo $output; // Output the image directly
	}

	curl_close($curl);

}
else if ($fileName == 'resale_team') {
	$curl = curl_init('http://202.40.181.98:9090/resale/web_api/version_1_0_1/resale_team.php');

	curl_setopt(
		$curl,
		CURLOPT_HTTPHEADER,
		array(
			'Content-Type: application/json',
			'sis_id: 1',
		)
	);

}

curl_setopt($curl, CURLOPT_POST, true);
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false);



$output = curl_exec($curl);

if ($output === false) {
	echo 'Curl error: ' . curl_error($curl);
}
else {
	$decoded_output = json_decode($output, true);
	if ($decoded_output === null) {
		echo 'Error decoding JSON';
	}
	else {
		header('Content-Type: application/json'); // Set JSON content type header
		echo json_encode($decoded_output); // Output the decoded JSON data
	}
}

curl_close($curl);
?>