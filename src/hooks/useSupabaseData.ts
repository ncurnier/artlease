import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { Database } from '../lib/supabase';

type Tables = Database['public']['Tables'];

// Hook pour récupérer les œuvres d'art
export const useArtworks = () => {
  const [artworks, setArtworks] = useState<Tables['artworks']['Row'][]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        const { data, error } = await supabase
          .from('artworks')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setArtworks(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur lors du chargement des œuvres');
      } finally {
        setLoading(false);
      }
    };

    fetchArtworks();
  }, []);

  return { artworks, loading, error, refetch: () => window.location.reload() };
};

// Hook pour récupérer les formules
export const useFormules = () => {
  const [formules, setFormules] = useState<Tables['formules']['Row'][]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFormules = async () => {
      try {
        const { data, error } = await supabase
          .from('formules')
          .select('*')
          .order('prix_base', { ascending: true });

        if (error) throw error;
        setFormules(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur lors du chargement des formules');
      } finally {
        setLoading(false);
      }
    };

    fetchFormules();
  }, []);

  return { formules, loading, error };
};

// Hook pour récupérer les prospects (admin seulement)
export const useProspects = () => {
  const [prospects, setProspects] = useState<Tables['prospects']['Row'][]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProspects = async () => {
      try {
        const { data, error } = await supabase
          .from('prospects')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setProspects(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur lors du chargement des prospects');
      } finally {
        setLoading(false);
      }
    };

    fetchProspects();
  }, []);

  return { prospects, loading, error };
};

// Hook pour récupérer les clients (admin seulement)
export const useClients = () => {
  const [clients, setClients] = useState<Tables['clients']['Row'][]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const { data, error } = await supabase
          .from('clients')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setClients(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur lors du chargement des clients');
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  return { clients, loading, error };
};

// Hook pour récupérer les locations
export const useLocations = () => {
  const [locations, setLocations] = useState<Tables['locations']['Row'][]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const { data, error } = await supabase
          .from('locations')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setLocations(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur lors du chargement des locations');
      } finally {
        setLoading(false);
      }
    };

    fetchLocations();
  }, []);

  return { locations, loading, error };
};

// Hook pour créer un prospect
export const useCreateProspect = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createProspect = async (prospectData: Tables['prospects']['Insert']) => {
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase
        .from('prospects')
        .insert([prospectData])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur lors de la création du prospect';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { createProspect, loading, error };
};

// Hook pour la gestion de la newsletter
export const useNewsletterData = () => {
  const [subscribers, setSubscribers] = useState<any[]>([]);
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNewsletterData = async () => {
      try {
        // Récupérer les abonnés
        const { data: subscribersData, error: subscribersError } = await supabase
          .from('newsletter_subscribers')
          .select('*')
          .order('created_at', { ascending: false });

        if (subscribersError) throw subscribersError;

        // Récupérer les campagnes
        const { data: campaignsData, error: campaignsError } = await supabase
          .from('newsletter_campaigns')
          .select('*')
          .order('created_at', { ascending: false });

        if (campaignsError) throw campaignsError;

        setSubscribers(subscribersData || []);
        setCampaigns(campaignsData || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur lors du chargement des données newsletter');
      } finally {
        setLoading(false);
      }
    };

    fetchNewsletterData();
  }, []);

  const createCampaign = async (campaignData: any) => {
    try {
      const { data, error } = await supabase
        .from('newsletter_campaigns')
        .insert([{
          ...campaignData,
          created_by: (await supabase.auth.getUser()).data.user?.id
        }])
        .select()
        .single();

      if (error) throw error;
      setCampaigns(prev => [data, ...prev]);
      return data;
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Erreur lors de la création de la campagne');
    }
  };

  const createSubscriber = async (subscriberData: any) => {
    try {
      const { data, error } = await supabase
        .rpc('add_newsletter_subscriber', {
          p_email: subscriberData.email,
          p_nom: subscriberData.nom || null,
          p_entreprise: subscriberData.entreprise || null,
          p_source: 'Manuel'
        });

      if (error) throw error;
      
      // Recharger les abonnés
      const { data: updatedSubscribers } = await supabase
        .from('newsletter_subscribers')
        .select('*')
        .order('created_at', { ascending: false });
      
      setSubscribers(updatedSubscribers || []);
      return data;
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Erreur lors de l\'ajout de l\'abonné');
    }
  };

  return { 
    subscribers, 
    campaigns, 
    loading, 
    error, 
    createCampaign, 
    createSubscriber 
  };
};

// Hook pour créer un abonné newsletter depuis le footer
export const useCreateNewsletterSubscriber = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createSubscriber = async (subscriberData: { 
    email: string; 
    nom?: string; 
    entreprise?: string; 
    source?: string 
  }) => {
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase
        .rpc('add_newsletter_subscriber', {
          p_email: subscriberData.email,
          p_nom: subscriberData.nom || null,
          p_entreprise: subscriberData.entreprise || null,
          p_source: subscriberData.source || 'Site web'
        });

      if (error) throw error;
      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur lors de l\'inscription à la newsletter';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { createSubscriber, loading, error };
};