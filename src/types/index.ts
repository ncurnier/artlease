export interface Artwork {
  id: string;
  titre: string;
  artiste: string;
  date: string;
  courant_artistique: string;
  description: string;
  biographie_artiste: string;
  prix_location_mois: number;
  disponibilite: 'Disponible' | 'Réservé' | 'En rotation';
  url_image: string;
}

export interface Prospect {
  id: string;
  nom: string;
  entreprise: string;
  email: string;
  telephone: string;
  statut: 'Nouveau' | 'Contacté' | 'Relancé' | 'Client converti';
  date_creation: string;
  source: 'Newsletter' | 'Contact' | 'Manuel';
}

export interface Client {
  id: string;
  nom: string;
  entreprise: string;
  email: string;
  telephone: string;
  adresse: string;
  date_creation: string;
  statut: 'Actif' | 'Inactif';
}

export interface Location {
  id: string;
  client_id: string;
  artwork_id: string;
  date_debut: string;
  date_fin: string;
  prix_mensuel: number;
  statut: 'En cours' | 'Terminée' | 'Annulée';
  services_inclus: string[];
}

export interface User {
  id: string;
  nom: string;
  email: string;
  role: 'admin' | 'client' | 'gestionnaire';
  entreprise?: string;
}

export interface FormuleLocation {
  id: string;
  nom: string;
  description: string;
  prix_base: number;
  services_inclus: string[];
  duree_minimum: number;
}