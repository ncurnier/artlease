import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { Database } from '../lib/supabase';

type Tables = Database['public']['Tables'];

// Hook pour récupérer les œuvres d'art
export const useArtworks = () => {
  const [artworks, setArtworks] = useState<Tables['artworks']['Row'][]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchArtworks = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('artworks')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }
      setArtworks(data || []);
    } catch (err) {
      console.error('Error fetching artworks:', err);
      setError(err instanceof Error ? err.message : 'Erreur lors du chargement des œuvres');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArtworks();
  }, []);

  return { artworks, loading, error, refetch: fetchArtworks };
};

// Hook pour récupérer les formules
export const useFormules = () => {
  const [formules, setFormules] = useState<Tables['formules']['Row'][]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFormules = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('formules')
        .select('*')
        .order('prix_base', { ascending: true });

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }
      setFormules(data || []);
    } catch (err) {
      console.error('Error fetching formules:', err);
      setError(err instanceof Error ? err.message : 'Erreur lors du chargement des formules');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFormules();
  }, []);

  return { formules, loading, error, refetch: fetchFormules };
};

// Hook pour récupérer les prospects
export const useProspects = () => {
  const [prospects, setProspects] = useState<Tables['prospects']['Row'][]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProspects = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('prospects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }
      setProspects(data || []);
    } catch (err) {
      console.error('Error fetching prospects:', err);
      setError(err instanceof Error ? err.message : 'Erreur lors du chargement des prospects');
    } finally {
      setLoading(false);
    }
  };

  const updateProspect = async (id: string, updates: Partial<Tables['prospects']['Update']>) => {
    try {
      const { data, error } = await supabase
        .from('prospects')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      
      // Mettre à jour la liste locale
      setProspects(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
      return data;
    } catch (err) {
      console.error('Error updating prospect:', err);
      throw err;
    }
  };

  const deleteProspect = async (id: string) => {
    try {
      const { error } = await supabase
        .from('prospects')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      // Mettre à jour la liste locale
      setProspects(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      console.error('Error deleting prospect:', err);
      throw err;
    }
  };

  useEffect(() => {
    fetchProspects();
  }, []);

  return { prospects, loading, error, refetch: fetchProspects, updateProspect, deleteProspect };
};

// Hook pour récupérer les clients
export const useClients = () => {
  const [clients, setClients] = useState<Tables['clients']['Row'][]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchClients = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('clients')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }
      setClients(data || []);
    } catch (err) {
      console.error('Error fetching clients:', err);
      setError(err instanceof Error ? err.message : 'Erreur lors du chargement des clients');
    } finally {
      setLoading(false);
    }
  };

  const updateClient = async (id: string, updates: Partial<Tables['clients']['Update']>) => {
    try {
      const { data, error } = await supabase
        .from('clients')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      
      setClients(prev => prev.map(c => c.id === id ? { ...c, ...updates } : c));
      return data;
    } catch (err) {
      console.error('Error updating client:', err);
      throw err;
    }
  };

  const deleteClient = async (id: string) => {
    try {
      const { error } = await supabase
        .from('clients')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      setClients(prev => prev.filter(c => c.id !== id));
    } catch (err) {
      console.error('Error deleting client:', err);
      throw err;
    }
  };

  const createClient = async (clientData: Tables['clients']['Insert']) => {
    try {
      const { data, error } = await supabase
        .from('clients')
        .insert([clientData])
        .select()
        .single();

      if (error) throw error;
      
      setClients(prev => [data, ...prev]);
      return data;
    } catch (err) {
      console.error('Error creating client:', err);
      throw err;
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  return { clients, loading, error, refetch: fetchClients, updateClient, deleteClient, createClient };
};

// Hook pour récupérer les locations
export const useLocations = () => {
  const [locations, setLocations] = useState<Tables['locations']['Row'][]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLocations = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('locations')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }
      setLocations(data || []);
    } catch (err) {
      console.error('Error fetching locations:', err);
      setError(err instanceof Error ? err.message : 'Erreur lors du chargement des locations');
    } finally {
      setLoading(false);
    }
  };

  const updateLocation = async (id: string, updates: Partial<Tables['locations']['Update']>) => {
    try {
      const { data, error } = await supabase
        .from('locations')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      
      setLocations(prev => prev.map(l => l.id === id ? { ...l, ...updates } : l));
      return data;
    } catch (err) {
      console.error('Error updating location:', err);
      throw err;
    }
  };

  const deleteLocation = async (id: string) => {
    try {
      const { error } = await supabase
        .from('locations')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      setLocations(prev => prev.filter(l => l.id !== id));
    } catch (err) {
      console.error('Error deleting location:', err);
      throw err;
    }
  };

  const createLocation = async (locationData: Tables['locations']['Insert']) => {
    try {
      const { data, error } = await supabase
        .from('locations')
        .insert([locationData])
        .select()
        .single();

      if (error) throw error;
      
      setLocations(prev => [data, ...prev]);
      return data;
    } catch (err) {
      console.error('Error creating location:', err);
      throw err;
    }
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  return { locations, loading, error, refetch: fetchLocations, updateLocation, deleteLocation, createLocation };
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

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }
      return data;
    } catch (err) {
      console.error('Error in createProspect:', err);
      const errorMessage = err instanceof Error ? err.message : 'Erreur lors de la création du prospect';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { createProspect, loading, error };
};

// Hook pour la gestion des œuvres d'art
export const useArtworkManagement = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createArtwork = async (artworkData: Tables['artworks']['Insert']) => {
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase
        .from('artworks')
        .insert([artworkData])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (err) {
      console.error('Error creating artwork:', err);
      const errorMessage = err instanceof Error ? err.message : 'Erreur lors de la création de l\'œuvre';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const updateArtwork = async (id: string, updates: Partial<Tables['artworks']['Update']>) => {
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase
        .from('artworks')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (err) {
      console.error('Error updating artwork:', err);
      const errorMessage = err instanceof Error ? err.message : 'Erreur lors de la mise à jour de l\'œuvre';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const deleteArtwork = async (id: string) => {
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase
        .from('artworks')
        .delete()
        .eq('id', id);

      if (error) throw error;
    } catch (err) {
      console.error('Error deleting artwork:', err);
      const errorMessage = err instanceof Error ? err.message : 'Erreur lors de la suppression de l\'œuvre';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { createArtwork, updateArtwork, deleteArtwork, loading, error };
};

// Hook pour la gestion de la newsletter
export const useNewsletterData = () => {
  const [subscribers, setSubscribers] = useState<any[]>([]);
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNewsletterData = async () => {
    try {
      setLoading(true);
      
      // Récupérer les abonnés
      const { data: subscribersData, error: subscribersError } = await supabase
        .from('newsletter_subscribers')
        .select('*')
        .order('created_at', { ascending: false });

      if (subscribersError) {
        console.error('Error fetching subscribers:', subscribersError);
        throw subscribersError;
      }

      // Récupérer les campagnes
      const { data: campaignsData, error: campaignsError } = await supabase
        .from('newsletter_campaigns')
        .select('*')
        .order('created_at', { ascending: false });

      if (campaignsError) {
        console.error('Error fetching campaigns:', campaignsError);
        throw campaignsError;
      }

      setSubscribers(subscribersData || []);
      setCampaigns(campaignsData || []);
    } catch (err) {
      console.error('Error fetching newsletter data:', err);
      setError(err instanceof Error ? err.message : 'Erreur lors du chargement des données newsletter');
    } finally {
      setLoading(false);
    }
  };

  const createCampaign = async (campaignData: any) => {
    try {
      const { data, error } = await supabase
        .from('newsletter_campaigns')
        .insert([{
          ...campaignData,
          statut: 'Brouillon',
          nombre_destinataires: 0,
          nombre_ouvertures: 0,
          nombre_clics: 0
        }])
        .select()
        .single();

      if (error) throw error;
      setCampaigns(prev => [data, ...prev]);
      return data;
    } catch (err) {
      console.error('Error creating campaign:', err);
      throw new Error(err instanceof Error ? err.message : 'Erreur lors de la création de la campagne');
    }
  };

  const createSubscriber = async (subscriberData: any) => {
    try {
      const { data, error } = await supabase
        .from('newsletter_subscribers')
        .insert([{
          email: subscriberData.email,
          nom: subscriberData.nom || null,
          entreprise: subscriberData.entreprise || null,
          source: subscriberData.source || 'Manuel',
          statut: 'Actif'
        }])
        .select()
        .single();

      if (error) throw error;
      setSubscribers(prev => [data, ...prev]);
      return data;
    } catch (err) {
      console.error('Error creating subscriber:', err);
      throw new Error(err instanceof Error ? err.message : 'Erreur lors de l\'ajout de l\'abonné');
    }
  };

  const updateSubscriber = async (id: string, updates: any) => {
    try {
      const { data, error } = await supabase
        .from('newsletter_subscribers')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      
      setSubscribers(prev => prev.map(s => s.id === id ? { ...s, ...updates } : s));
      return data;
    } catch (err) {
      console.error('Error updating subscriber:', err);
      throw err;
    }
  };

  const deleteSubscriber = async (id: string) => {
    try {;
      const { error } = await supabase
        .from('newsletter_subscribers')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      setSubscribers(prev => prev.filter(s => s.id !== id));
    } catch (err) {
      console.error('Error deleting subscriber:', err);
      throw err;
    }
  };

  useEffect(() => {
    fetchNewsletterData();
  }, []);

  return { 
    subscribers, 
    campaigns, 
    loading, 
    error, 
    createCampaign, 
    createSubscriber,
    updateSubscriber,
    deleteSubscriber,
    refetch: fetchNewsletterData
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
        .from('newsletter_subscribers')
        .insert([{
          email: subscriberData.email,
          nom: subscriberData.nom || null,
          entreprise: subscriberData.entreprise || null,
          source: subscriberData.source || 'Site web',
          statut: 'Actif'
        }])
        .select()
        .single();

      if (error) {
        console.error('Supabase error newsletter:', error);
        throw error;
      }
      return data;
    } catch (err) {
      console.error('Error in createSubscriber:', err);
      const errorMessage = err instanceof Error ? err.message : 'Erreur lors de l\'inscription à la newsletter';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { createSubscriber, loading, error };
};
