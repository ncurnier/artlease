# Configuration Google OAuth pour Supabase

## Instructions pour activer Google OAuth

Pour activer l'authentification Google OAuth dans votre projet Supabase "ArtLease Pro", suivez ces étapes :

### 1. Accéder au Dashboard Supabase
1. Connectez-vous à [supabase.com](https://supabase.com)
2. Sélectionnez votre projet "ArtLease Pro" (rxadlcvelitixlhptulb)

### 2. Configurer Google OAuth
1. Dans le menu latéral, allez dans **Authentication** > **Providers**
2. Trouvez **Google** dans la liste des providers
3. Activez le toggle **Enable sign in with Google**

### 3. Configuration Google Cloud Console
1. Allez sur [Google Cloud Console](https://console.cloud.google.com/)
2. Créez un nouveau projet ou sélectionnez un projet existant
3. Activez l'API **Google+ API** ou **Google Identity**
4. Allez dans **APIs & Services** > **Credentials**
5. Cliquez sur **Create Credentials** > **OAuth 2.0 Client IDs**
6. Configurez l'écran de consentement OAuth si nécessaire
7. Sélectionnez **Web application** comme type d'application

### 4. URLs de redirection
Ajoutez ces URLs dans les **Authorized redirect URIs** :
```
https://rxadlcvelitixlhptulb.supabase.co/auth/v1/callback
```

### 5. Configuration dans Supabase
1. Copiez le **Client ID** et **Client Secret** depuis Google Cloud Console
2. Dans Supabase, collez ces valeurs dans les champs correspondants :
   - **Client ID** : Votre Google Client ID
   - **Client Secret** : Votre Google Client Secret
3. Cliquez sur **Save**

### 6. Test
Une fois configuré, le bouton Google OAuth sur votre application devrait fonctionner sans erreur 400.

### URLs importantes
- **Application déployée** : https://artlease-access-app-zmd9vv7o.devinapps.com
- **Supabase Project** : https://rxadlcvelitixlhptulb.supabase.co
- **Page de connexion** : https://artlease-access-app-zmd9vv7o.devinapps.com/login

### Note
Cette configuration nécessite un accès administrateur au projet Supabase et à Google Cloud Console.
