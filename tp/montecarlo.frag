layout(location=20) uniform int nb_emissives;
layout(location=21) uniform int NB_BOUNCES;

vec3 sample_hemisphere()
{
	// Algo echantillonnage uniforme hemisphere:
	// Z <- rand entre ? et ?
	// beta <- Z : angle/plan_xy ???????
	// alpha <- rand entre ? et ?
	// x,y,z <- alpha,beta : coord polaire -> cartesienne

	float Z = random_float();
	float beta = acos(2 * Z - 1) / 2;	// 180 degrees
	float alpha = radians(random_float() * 360); //360 degrees

	float x = sin(beta) * cos(alpha);
	float y = sin(beta) * sin(alpha);
	float z = cos(beta);

	vec3 real = vec3(x,y,z);
	return normalize(real);
}

vec3 random_ray(in vec3 D)
{
	// Algo orientation échantillon
	// choisir un W normalisé non colineaire à D
	// U orthogonal à D et W
	// V tq U,V,D repère ortho-normé direct
	// mettre  U,V,D dans une  matrice 3x3 de changement de repère M
	// multiplier votre echantillon par M pour bien l'orienter
	// ici par de matrice 4x4 car pas de translation

	vec3 W = normalize(random_vec3());
	while (abs(dot(W,D)) == 0.0)
		W = normalize(random_vec3());

	vec3 U = normalize (cross(D,W));
	vec3 V = normalize (cross(U,D));
	mat3 M = mat3(U, V, D);
	return M * sample_hemisphere();
}

vec3 random_path(in vec3 D, in vec3 O)
{
	float attenu = 1.0;
	vec3 finalColor = vec3(0);

	for(int i=0; i<NB_BOUNCES; ++i)
	{

		traverse_all_bvh(O,D);
		
		// on retourne la couleur finale si le rayon ne touche pas ou plus un objet de scène
		if (!hit())
			return finalColor;

		// s'il touche
		vec3 N;
		vec3 P;
		intersection_info(N,P);
		N = normalize(N);
		vec4 mat = intersection_mat_info();
		vec4 col = intersection_color_info();
		
        //Energie totale
		finalColor += col.rgb * attenu;
		
		// si le rayon touche la lumière
		if (mat[2]>0)
			return finalColor * mat[2];

		// lambertian modifié
		attenu *= 0.3 + 0.9*max(0.0,dot(D,N)); 

		// rebond
		O = P+BIAS*N;
		D = random_ray(N);

	}

	return vec3(0,0,0);
}

vec3 raytrace(in vec3 Dir, in vec3 Orig)   
{
	// init de la graine du random
	srand();
	// calcul de la lumière captée par un chemin aléatoire
	return random_path(normalize(Dir),Orig);
}

