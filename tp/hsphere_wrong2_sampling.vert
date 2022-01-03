
vec3 sample_hemisphere()
{
	float Z = (random_float());
	float beta = acos(2 * Z - 1) / 2;	
	float alpha = radians(random_float() * 360);

	float x = sin(beta) * cos(alpha);
	float y = sin(beta) * sin(alpha);
	float z = cos(beta);

	vec3 real = vec3(x,y,z);
	return normalize(2.0*real-1.0);
}

// D direction principale de l'hemisphere, normalisée
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
	while (dot(W,D) == 0)
		W = normalize(random_vec3());

	vec3 U = normalize (cross(D,W));
	vec3 V = normalize (cross(U, D));
	mat3 M = mat3(V, U, D);
	return M * sample_hemisphere();
}


void main()
{
	// param de srand le nombre de random_float appelé dans le shader
	srand(3u);
	vec3 P = random_ray(normalize(normal));
	gl_Position = pvMatrix * vec4(P,1);
}