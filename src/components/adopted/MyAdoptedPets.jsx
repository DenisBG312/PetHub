import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Heart, CheckCircle } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import LoadingSpinner from '../ui/LoadingSpinner';
import { useAuth } from '../../contexts/AuthContext';
import PetCard from '../pets/PetCard';

export default function MyAdoptedPets() {
  const { user, isAuthenticated } = useAuth();
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAdoptedPets = useCallback(async () => {
    if (!isAuthenticated || !user) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('pets')
        .select('*')
        .eq('adopted_by', user.id)
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;

      setPets(data || []);
    } catch (err) {
      console.error('Error fetching adopted pets:', err);
      setError('Failed to load adopted pets.');
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated, user]);

  useEffect(() => {
    fetchAdoptedPets();
  }, [fetchAdoptedPets]);

  if (loading) {
    return <LoadingSpinner fullScreen text="Loading your adopted pets..." />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <CheckCircle className="w-8 h-8 text-green-400" />
            <h1 className="text-4xl md:text-5xl font-extrabold text-white">
              My Adopted Pets
            </h1>
          </div>
          <p className="text-lg text-slate-400">
            Here are all the pets you've adopted and given a loving home.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-lg bg-red-500/20 border border-red-500/30 text-red-400">
            {error}
          </div>
        )}

        {pets.length === 0 ? (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-4 border-green-500/30 mb-6">
              <CheckCircle className="w-12 h-12 text-green-400" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">No Adopted Pets Yet</h2>
            <p className="text-slate-400 mb-8 max-w-md mx-auto">
              You haven't adopted any pets yet. Browse our catalog to find your perfect companion!
            </p>
            <Link
              to="/pets"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105"
            >
              Browse Available Pets
            </Link>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <p className="text-slate-400">
                You have adopted <span className="text-white font-semibold">{pets.length}</span>{' '}
                {pets.length === 1 ? 'pet' : 'pets'}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pets.map((pet) => (
                <PetCard key={pet.id} pet={pet} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

