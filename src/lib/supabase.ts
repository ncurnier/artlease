import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://rxadlcvelitixlhptulb.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ4YWRsY3ZlbGl0aXhsaHB0dWxiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYzMzQ0NzMsImV4cCI6MjA1MTkxMDQ3M30.Qs6Qs_Qs6Qs_Qs6Qs_Qs6Qs_Qs6Qs_Qs6Qs_Qs6Qs';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Variables d\'environnement Supabase manquantes, utilisation des valeurs par défaut');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});

// Types pour TypeScript
export type Database = {
  public: {
    Tables: {
      artworks: {
        Row: {
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
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          titre: string;
          artiste: string;
          date: string;
          courant_artistique: string;
          description: string;
          biographie_artiste: string;
          prix_location_mois: number;
          disponibilite?: 'Disponible' | 'Réservé' | 'En rotation';
          url_image: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          titre?: string;
          artiste?: string;
          date?: string;
          courant_artistique?: string;
          description?: string;
          biographie_artiste?: string;
          prix_location_mois?: number;
          disponibilite?: 'Disponible' | 'Réservé' | 'En rotation';
          url_image?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      prospects: {
        Row: {
          id: string;
          nom: string;
          entreprise: string;
          email: string;
          telephone: string | null;
          statut: 'Nouveau' | 'Contacté' | 'Relancé' | 'Client converti';
          source: 'Newsletter' | 'Contact' | 'Manuel';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          nom: string;
          entreprise: string;
          email: string;
          telephone?: string | null;
          statut?: 'Nouveau' | 'Contacté' | 'Relancé' | 'Client converti';
          source?: 'Newsletter' | 'Contact' | 'Manuel';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          nom?: string;
          entreprise?: string;
          email?: string;
          telephone?: string | null;
          statut?: 'Nouveau' | 'Contacté' | 'Relancé' | 'Client converti';
          source?: 'Newsletter' | 'Contact' | 'Manuel';
          created_at?: string;
          updated_at?: string;
        };
      };
      clients: {
        Row: {
          id: string;
          nom: string;
          entreprise: string;
          email: string;
          telephone: string | null;
          adresse: string | null;
          statut: 'Actif' | 'Inactif';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          nom: string;
          entreprise: string;
          email: string;
          telephone?: string | null;
          adresse?: string | null;
          statut?: 'Actif' | 'Inactif';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          nom?: string;
          entreprise?: string;
          email?: string;
          telephone?: string | null;
          adresse?: string | null;
          statut?: 'Actif' | 'Inactif';
          created_at?: string;
          updated_at?: string;
        };
      };
      formules: {
        Row: {
          id: string;
          nom: string;
          description: string;
          prix_base: number;
          services_inclus: string[];
          duree_minimum: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          nom: string;
          description: string;
          prix_base: number;
          services_inclus?: string[];
          duree_minimum?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          nom?: string;
          description?: string;
          prix_base?: number;
          services_inclus?: string[];
          duree_minimum?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      locations: {
        Row: {
          id: string;
          client_id: string;
          artwork_id: string;
          formule_id: string | null;
          date_debut: string;
          date_fin: string;
          prix_mensuel: number;
          statut: 'En cours' | 'Terminée' | 'Annulée';
          services_inclus: string[];
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          client_id: string;
          artwork_id: string;
          formule_id?: string | null;
          date_debut: string;
          date_fin: string;
          prix_mensuel: number;
          statut?: 'En cours' | 'Terminée' | 'Annulée';
          services_inclus?: string[];
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          client_id?: string;
          artwork_id?: string;
          formule_id?: string | null;
          date_debut?: string;
          date_fin?: string;
          prix_mensuel?: number;
          statut?: 'En cours' | 'Terminée' | 'Annulée';
          services_inclus?: string[];
          created_at?: string;
          updated_at?: string;
        };
      };
      user_profiles: {
        Row: {
          id: string;
          nom: string;
          email: string;
          role: 'admin' | 'client' | 'gestionnaire';
          entreprise: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          nom: string;
          email: string;
          role?: 'admin' | 'client' | 'gestionnaire';
          entreprise?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          nom?: string;
          email?: string;
          role?: 'admin' | 'client' | 'gestionnaire';
          entreprise?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
};