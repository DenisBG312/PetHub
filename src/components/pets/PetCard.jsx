import { Link } from 'react-router-dom';
import { Heart, CheckCircle } from 'lucide-react';

export default function PetCard({ pet }) {
  return (
    <Link
      to={`/pets/${pet.id}`}
      className={`group relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-slate-900/50 ${
        pet.adopted_by 
          ? 'border-slate-700/50 hover:border-slate-600/50' 
          : 'border-slate-700/50 hover:border-slate-600/50'
      }`}
    >
      <div className="relative h-64 overflow-hidden bg-slate-700/30">
        {pet.image_url ? (
          <img
            src={pet.image_url}
            alt={pet.name}
            className={`w-full h-full object-cover group-hover:scale-110 transition-transform duration-300 ${
              pet.adopted_by ? 'opacity-75' : ''
            }`}
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/400x400?text=Pet+Image';
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-500/20 to-purple-500/20">
            <img src="https://i.pinimg.com/736x/85/e1/c0/85e1c0161e9c0d4fe926550d7c6b26e0.jpg" alt="Placeholder Pet" />
          </div>
        )}

        {pet.adopted_by && (
          <div className="absolute top-4 left-4 flex items-center gap-1 px-3 py-1.5 rounded-full bg-green-500/90 backdrop-blur-sm border border-green-400/50 shadow-lg">
            <CheckCircle className="w-4 h-4 text-white" />
            <span className="text-white text-xs font-semibold">Adopted</span>
          </div>
        )}

        <div className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1.5 rounded-full bg-slate-900/80 backdrop-blur-sm border border-slate-700/50">
          <Heart className="w-4 h-4 text-red-400 fill-red-400" />
          <span className="text-white text-xs font-medium">{pet.likes || 0}</span>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="text-xl font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">
              {pet.name}
            </h3>
            <p className="text-slate-400 text-sm">{pet.breed || 'Mixed Breed'}</p>
          </div>

          {pet.age && (
            <div className="px-2 py-1 rounded-md bg-blue-500/20 border border-blue-500/30">
              <span className="text-blue-400 text-xs font-medium">
                {pet.age} {pet.age === 1 ? 'year' : 'years'}
              </span>
            </div>
          )}
        </div>

        {pet.description && (
          <p className="text-slate-400 text-sm line-clamp-2 mb-4">{pet.description}</p>
        )}

        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-500">
            Posted {new Date(pet.created_at).toLocaleDateString()}
          </span>
          <span className="text-blue-400 text-sm font-medium group-hover:text-blue-300 transition-colors">
            View Details →
          </span>
        </div>
      </div>
    </Link>
  );
}
