import React, { useState } from 'react';
import { Sparkles, Save, X, Upload, Image as ImageIcon, Video, Eye, EyeOff, ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { generateExerciseDescription } from '../services/geminiService';
import { useNavigate } from 'react-router-dom';

const CreateExercise: React.FC = () => {
  const navigate = useNavigate();
  // 1 Info, 2 Muscles, 3 Multimedia, 4 Instructions, 5 Benefits, 6 Variants, 7 Visibility, 8 Preview
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [muscle, setMuscle] = useState('');
  const [secondaryMuscle, setSecondaryMuscle] = useState('');
  const [equipment, setEquipment] = useState('');
  const [description, setDescription] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [mediaFiles, setMediaFiles] = useState<File[]>([]);
  const [mediaPreviewUrls, setMediaPreviewUrls] = useState<string[]>([]);
  const [isPublic, setIsPublic] = useState(true);
  const [instructions, setInstructions] = useState<string[]>(['']);
  const [benefitTitle, setBenefitTitle] = useState('');
  const [benefitDescription, setBenefitDescription] = useState('');
  const [benefitCategories, setBenefitCategories] = useState<string[]>([]);
  const [variants, setVariants] = useState<Array<{ name: string; notes?: string }>>([]);

  const handleGenerateAI = async () => {
    if (!name) {
      alert("Por favor ingrese al menos el nombre del ejercicio.");
      return;
    }
    setIsGenerating(true);
    const desc = await generateExerciseDescription(name, muscle, equipment || 'General Equipment');
    setDescription(desc);
    setIsGenerating(false);
  };

  const handleSelectMedia = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.multiple = true;
    input.accept = 'image/jpeg,image/png,video/mp4';
    input.onchange = (e) => {
      const files = Array.from((e.target as HTMLInputElement).files || []);
      const newUrls = files.map(f => URL.createObjectURL(f));
      setMediaFiles([...mediaFiles, ...files]);
      setMediaPreviewUrls([...mediaPreviewUrls, ...newUrls]);
    };
    input.click();
  };

  const handleRemoveMedia = (index: number) => {
    URL.revokeObjectURL(mediaPreviewUrls[index]);
    setMediaFiles(mediaFiles.filter((_, i) => i !== index));
    setMediaPreviewUrls(mediaPreviewUrls.filter((_, i) => i !== index));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const files = Array.from(e.dataTransfer.files).filter((file: File) => 
      file.type.startsWith('image/') || file.type === 'video/mp4'
    );
    
    if (files.length > 0) {
      const newUrls = files.map((f: File) => URL.createObjectURL(f));
      setMediaFiles([...mediaFiles, ...files]);
      setMediaPreviewUrls([...mediaPreviewUrls, ...newUrls]);
    }
  };

  const handleSave = () => {
    if (!name) {
      alert('Por favor completa el nombre del ejercicio.');
      return;
    }
    // Ir al paso 2: Grupos Musculares
    setStep(2);
  };

  const goNext = () => setStep((s) => Math.min(s + 1, 8));
  const goPrev = () => setStep((s) => Math.max(s - 1, 1));

  const handlePublish = async () => {
    // Convertir archivos a base64 para almacenamiento
    const mediaFilesData = await Promise.all(
      mediaFiles.map(async (file) => {
        return new Promise<any>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            resolve({
              name: file.name,
              size: file.size,
              type: file.type,
              data: reader.result // base64 string
            });
          };
          reader.readAsDataURL(file);
        });
      })
    );

    // Crear objeto del ejercicio
    const newExercise = {
      id: Date.now(),
      name,
      muscle,
      secondaryMuscle,
      equipment: equipment || 'No especificado',
      description,
      mediaFiles: mediaFilesData,
      instructions: instructions.filter(i => i.trim()),
      benefit: benefitTitle ? {
        title: benefitTitle,
        description: benefitDescription,
        categories: benefitCategories
      } : null,
      variants,
      isPublic,
      createdAt: new Date().toISOString()
    };

    // Obtener ejercicios existentes
    const existing = localStorage.getItem('exercises');
    const exercises = existing ? JSON.parse(existing) : [];
    
    // Agregar nuevo ejercicio
    exercises.push(newExercise);
    localStorage.setItem('exercises', JSON.stringify(exercises));

    // Limpiar URLs de preview
    mediaPreviewUrls.forEach(url => URL.revokeObjectURL(url));

    // Mostrar confirmación
    const visibilityText = isPublic ? 'público' : 'privado';
    alert(`✅ Ejercicio "${name}" guardado como ${visibilityText}.`);
    
    // Navegar a la lista de ejercicios
    navigate('/exercises');
  };

  const handleCancel = () => {
    if (step === 8) {
      setStep(7);
      return;
    }
    if (step === 7) {
      setStep(6);
      return;
    }
    if (step === 6) {
      setStep(5);
      return;
    }
    if (step === 5) {
      setStep(4);
      return;
    }
    if (step === 4) {
      setStep(3);
      return;
    }
    if (step === 3) {
      setStep(2);
      return;
    }
    if (step === 2) {
      setStep(1);
      return;
    }
    if (name || muscle || equipment || description || mediaFiles.length > 0) {
      if (confirm('¿Descartar los cambios?')) {
        // Limpiar URLs de preview
        mediaPreviewUrls.forEach(url => URL.revokeObjectURL(url));
        setStep(1);
        setName('');
        setMuscle('');
        setSecondaryMuscle('');
        setEquipment('');
        setDescription('');
        setMediaFiles([]);
        setMediaPreviewUrls([]);
        setIsPublic(true);
        setInstructions(['']);
        setBenefitTitle('');
        setBenefitDescription('');
        setBenefitCategories([]);
        setVariants([]);
      }
    }
  };

  // Step 8: Preview/Confirm Screen
  if (step === 8) {
    return (
      <div className="max-w-4xl mx-auto flex flex-col gap-6 md:gap-8">
        <header className="flex items-center gap-4">
          <button 
            onClick={goPrev}
            className="p-2 hover:bg-[#23482f] rounded-lg transition focus-visible:outline-[3px] focus-visible:outline-[#13ec5b] focus-visible:outline-offset-2"
            aria-label="Volver"
          >
            <ArrowLeft size={24} className="text-white" />
          </button>
          <div className="flex flex-col gap-2">
            <h1 className="text-white text-2xl sm:text-3xl md:text-4xl font-black leading-tight">Paso 8: Vista Previa y Confirmación</h1>
            <p className="text-[#a9d8b9] text-sm sm:text-base leading-relaxed">Revisa la información antes de publicar.</p>
          </div>
        </header>

        <section aria-labelledby="preview-heading" className="bg-[#112217] rounded-xl p-4 sm:p-6 md:p-8 border border-[#326744]">
          <h2 id="preview-heading" className="text-white text-xl md:text-2xl font-bold mb-6">Información del Ejercicio</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <p className="text-[#a9d8b9] text-sm font-medium mb-2">Nombre</p>
              <p className="text-white text-lg font-bold">{name}</p>
            </div>
            <div>
              <p className="text-[#a9d8b9] text-sm font-medium mb-2">Grupo Muscular</p>
              <p className="text-white text-lg font-bold">{muscle}{secondaryMuscle ? ' / ' + secondaryMuscle : ''}</p>
            </div>
            <div>
              <p className="text-[#a9d8b9] text-sm font-medium mb-2">Equipo</p>
              <p className="text-white text-lg font-bold">{equipment || 'No especificado'}</p>
            </div>
            <div>
              <p className="text-[#a9d8b9] text-sm font-medium mb-2">Archivos Multimedia</p>
              <p className="text-white text-lg font-bold">{mediaFiles.length} archivo(s)</p>
            </div>
          </div>

          {description && (
            <div className="mb-8">
              <p className="text-[#a9d8b9] text-sm font-medium mb-2">Descripción</p>
              <p className="text-white text-base leading-relaxed bg-[#193322] p-4 rounded-lg">{description}</p>
            </div>
          )}

          {mediaFiles.length > 0 && (
            <div className="mb-8">
              <p className="text-[#a9d8b9] text-sm font-medium mb-3">Archivos Multimedia</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {mediaFiles.map((file, index) => (
                  <div key={index} className="bg-[#193322] rounded-lg border border-[#326744] overflow-hidden">
                    {file.type.startsWith('image/') ? (
                      <img src={mediaPreviewUrls[index]} alt={file.name} className="w-full aspect-video object-cover" />
                    ) : (
                      <video src={mediaPreviewUrls[index]} controls className="w-full aspect-video bg-[#23482f]" />
                    )}
                    <div className="p-3">
                      <p className="text-white text-xs font-medium truncate">{file.name}</p>
                      <p className="text-[#a9d8b9] text-xs">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {instructions.filter(i => i.trim()).length > 0 && (
            <div className="mb-8">
              <p className="text-[#a9d8b9] text-sm font-medium mb-2">Pasos de Ejecución</p>
              <ol className="space-y-2">
                {instructions.filter(i => i.trim()).map((text, idx) => (
                  <li key={idx} className="text-white text-sm leading-relaxed bg-[#193322] p-3 rounded-lg">
                    <span className="text-[#13ec5b] font-bold mr-2">{idx + 1}.</span>{text}
                  </li>
                ))}
              </ol>
            </div>
          )}

          {(benefitTitle || benefitDescription) && (
            <div className="mb-8">
              <p className="text-[#a9d8b9] text-sm font-medium mb-2">Beneficios</p>
              <div className="bg-[#193322] p-4 rounded-lg">
                {benefitTitle && <p className="text-white font-bold mb-1">{benefitTitle}</p>}
                {benefitDescription && <p className="text-white/90 text-sm leading-relaxed">{benefitDescription}</p>}
                {benefitCategories.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {benefitCategories.map((cat, idx) => (
                      <span key={idx} className="px-2 py-1 text-xs rounded-full bg-[#23482f] text-white border border-[#326744]">{cat}</span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {variants.length > 0 && (
            <div className="mb-8">
              <p className="text-[#a9d8b9] text-sm font-medium mb-2">Variantes</p>
              <ul className="space-y-2">
                {variants.map((v, idx) => (
                  <li key={idx} className="bg-[#193322] p-3 rounded-lg text-white">
                    <span className="font-bold">{v.name}</span>{v.notes ? ` — ${v.notes}` : ''}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="border-t border-[#326744] pt-6">
            <h3 className="text-white text-lg font-bold mb-4">Visibilidad</h3>
            <div className="flex flex-col gap-3">
              <label className="flex items-start gap-3 p-4 bg-[#193322] rounded-lg border-2 border-[#326744] hover:border-[#13ec5b]/50 cursor-pointer transition">
                <input
                  type="radio"
                  name="visibility"
                  checked={isPublic}
                  onChange={() => setIsPublic(true)}
                  className="mt-1"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Eye size={20} className="text-[#13ec5b]" />
                    <p className="text-white font-bold">Público</p>
                  </div>
                  <p className="text-[#a9d8b9] text-sm">Visible para todos los usuarios de la aplicación móvil</p>
                </div>
              </label>

              <label className="flex items-start gap-3 p-4 bg-[#193322] rounded-lg border-2 border-[#326744] hover:border-[#13ec5b]/50 cursor-pointer transition">
                <input
                  type="radio"
                  name="visibility"
                  checked={!isPublic}
                  onChange={() => setIsPublic(false)}
                  className="mt-1"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <EyeOff size={20} className="text-gray-400" />
                    <p className="text-white font-bold">Privado</p>
                  </div>
                  <p className="text-[#a9d8b9] text-sm">Solo visible para administradores, no aparecerá en la app de usuarios</p>
                </div>
              </label>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-end gap-3 mt-8 pt-6 border-t border-[#326744]">
            <button 
              onClick={handleCancel} 
              className="flex items-center justify-center h-12 px-6 rounded-xl border border-[#326744] text-white font-bold hover:bg-[#23482f] transition focus-visible:outline-[3px] focus-visible:outline-[#13ec5b] focus-visible:outline-offset-2"
            >
              <ArrowLeft size={18} className="mr-2" /> Volver a Editar
            </button>
            <button 
              onClick={handlePublish} 
              className="flex items-center justify-center h-12 px-6 rounded-xl bg-[#13ec5b] text-[#112217] font-bold hover:bg-opacity-90 transition focus-visible:outline-[3px] focus-visible:outline-[#23482f] focus-visible:outline-offset-2"
            >
              <Check size={18} className="mr-2" /> {isPublic ? 'Confirmar Publicación' : 'Confirmar Guardado Privado'}
            </button>
          </div>
        </section>
      </div>
    );
  }

  // Step 7: Visibility Screen
  if (step === 7) {
    return (
      <div className="max-w-4xl mx-auto flex flex-col gap-6 md:gap-8">
        <header className="flex items-center gap-4">
          <button 
            onClick={goPrev}
            className="p-2 hover:bg-[#23482f] rounded-lg transition focus-visible:outline-[3px] focus-visible:outline-[#13ec5b] focus-visible:outline-offset-2"
            aria-label="Volver"
          >
            <ArrowLeft size={24} className="text-white" />
          </button>
          <div className="flex flex-col gap-2">
            <h1 className="text-white text-2xl sm:text-3xl md:text-4xl font-black leading-tight">Paso 7: Visualización</h1>
            <p className="text-[#a9d8b9] text-sm sm:text-base leading-relaxed">Elige si será público o privado.</p>
          </div>
        </header>
        <section className="bg-[#112217] rounded-xl p-4 sm:p-6 md:p-8 border border-[#326744]">
          <div className="flex flex-col gap-3">
            <label className="flex items-start gap-3 p-4 bg-[#193322] rounded-lg border-2 border-[#326744] hover:border-[#13ec5b]/50 cursor-pointer transition">
              <input
                type="radio"
                name="visibility"
                checked={isPublic}
                onChange={() => setIsPublic(true)}
                className="mt-1"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Eye size={20} className="text-[#13ec5b]" />
                  <p className="text-white font-bold">Público</p>
                </div>
                <p className="text-[#a9d8b9] text-sm">Visible para todos los usuarios de la aplicación móvil</p>
              </div>
            </label>

            <label className="flex items-start gap-3 p-4 bg-[#193322] rounded-lg border-2 border-[#326744] hover:border-[#13ec5b]/50 cursor-pointer transition">
              <input
                type="radio"
                name="visibility"
                checked={!isPublic}
                onChange={() => setIsPublic(false)}
                className="mt-1"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <EyeOff size={20} className="text-gray-400" />
                  <p className="text-white font-bold">Privado</p>
                </div>
                <p className="text-[#a9d8b9] text-sm">Solo visible para administradores, no aparecerá en la app de usuarios</p>
              </div>
            </label>
          </div>

          <div className="flex flex-col sm:flex-row justify-between gap-3 mt-8 pt-6 border-t border-[#326744]">
            <button 
              onClick={goPrev} 
              className="flex items-center justify-center h-12 px-6 rounded-xl border border-[#326744] text-white font-bold hover:bg-[#23482f] transition focus-visible:outline-[3px] focus-visible:outline-[#13ec5b] focus-visible:outline-offset-2"
            >
              <ArrowLeft size={18} className="mr-2" /> Anterior
            </button>
            <button 
              onClick={goNext} 
              className="flex items-center justify-center h-12 px-6 rounded-xl bg-[#13ec5b] text-[#112217] font-bold hover:bg-opacity-90 transition focus-visible:outline-[3px] focus-visible:outline-[#23482f] focus-visible:outline-offset-2"
            >
              Continuar <ArrowRight size={18} className="ml-2" />
            </button>
          </div>
        </section>
      </div>
    );
  }

  // Step 6: Variants Manager
  if (step === 6) {
    const addVariant = () => setVariants([...variants, { name: '' }]);
    const updateVariant = (idx: number, field: 'name' | 'notes', value: string) => {
      setVariants(variants.map((v, i) => i === idx ? { ...v, [field]: value } : v));
    };
    const removeVariant = (idx: number) => setVariants(variants.filter((_, i) => i !== idx));
    return (
      <div className="max-w-4xl mx-auto flex flex-col gap-6 md:gap-8">
        <header className="flex items-center gap-4">
          <button onClick={goPrev} className="p-2 hover:bg-[#23482f] rounded-lg transition focus-visible:outline-[3px] focus-visible:outline-[#13ec5b] focus-visible:outline-offset-2" aria-label="Volver">
            <ArrowLeft size={24} className="text-white" />
          </button>
          <div className="flex flex-col gap-2">
            <h1 className="text-white text-2xl sm:text-3xl md:text-4xl font-black leading-tight">Paso 6: Variantes del Ejercicio</h1>
            <p className="text-[#a9d8b9] text-sm sm:text-base leading-relaxed">Gestiona versiones alternativas del ejercicio.</p>
          </div>
        </header>
        <section className="bg-[#112217] rounded-xl p-4 sm:p-6 md:p-8 border border-[#326744]">
          <div className="flex justify-end mb-4">
            <button onClick={addVariant} className="px-4 py-2 bg-[#23482f] text-white rounded-lg font-bold hover:bg-[#326744]">Añadir Variante</button>
          </div>
          {variants.length === 0 ? (
            <p className="text-[#a9d8b9]">Aún no hay variantes.</p>
          ) : (
            <div className="space-y-4">
              {variants.map((v, idx) => (
                <div key={idx} className="bg-[#193322] p-4 rounded-lg border border-[#326744]">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-white font-medium mb-2 block">Nombre de la Variante</label>
                      <input value={v.name} onChange={(e) => updateVariant(idx, 'name', e.target.value)} className="w-full h-12 px-4 rounded-xl bg-[#193322] border border-[#326744] text-white" placeholder="Ej: Press de Banca con Mancuernas" />
                    </div>
                    <div>
                      <label className="text-white font-medium mb-2 block">Notas</label>
                      <input value={v.notes || ''} onChange={(e) => updateVariant(idx, 'notes', e.target.value)} className="w-full h-12 px-4 rounded-xl bg-[#193322] border border-[#326744] text-white" placeholder="Ej: Enfatiza control del movimiento" />
                    </div>
                  </div>
                  <div className="flex justify-end mt-3">
                    <button onClick={() => removeVariant(idx)} className="p-2 hover:bg-red-900/30 rounded text-red-400" aria-label="Eliminar variante"><X size={18} /></button>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="flex justify-between gap-3 mt-8 pt-6 border-t border-[#326744]">
            <button onClick={goPrev} className="flex items-center justify-center h-12 px-6 rounded-xl border border-[#326744] text-white font-bold hover:bg-[#23482f]"><ArrowLeft size={18} className="mr-2" /> Anterior</button>
            <button onClick={goNext} className="flex items-center justify-center h-12 px-6 rounded-xl bg-[#13ec5b] text-[#112217] font-bold hover:bg-opacity-90">Continuar <ArrowRight size={18} className="ml-2" /></button>
          </div>
        </section>
      </div>
    );
  }

  // Step 5: Benefits Editor
  if (step === 5) {
    const availableCategories = ['Cardio', 'Salud General', 'Fuerza', 'Resistencia', 'Flexibilidad', 'Pérdida de Peso', 'Aumento de Masa'];
    const toggleCategory = (cat: string) => {
      if (benefitCategories.includes(cat)) {
        setBenefitCategories(benefitCategories.filter(c => c !== cat));
      } else {
        setBenefitCategories([...benefitCategories, cat]);
      }
    };
    return (
      <div className="max-w-4xl mx-auto flex flex-col gap-6 md:gap-8">
        <header className="flex items-center gap-4">
          <button onClick={goPrev} className="p-2 hover:bg-[#23482f] rounded-lg transition focus-visible:outline-[3px] focus-visible:outline-[#13ec5b] focus-visible:outline-offset-2" aria-label="Volver">
            <ArrowLeft size={24} className="text-white" />
          </button>
          <div className="flex flex-col gap-2">
            <h1 className="text-white text-2xl sm:text-3xl md:text-4xl font-black leading-tight">Paso 5: Beneficios del Ejercicio</h1>
            <p className="text-[#a9d8b9] text-sm sm:text-base leading-relaxed">Define beneficios y categorías.</p>
          </div>
        </header>
        <section className="bg-[#112217] rounded-xl p-4 sm:p-6 md:p-8 border border-[#326744]">
          <div className="flex flex-col gap-6">
            <div>
              <label className="text-white font-medium mb-2 block">Título del Beneficio</label>
              <input value={benefitTitle} onChange={(e) => setBenefitTitle(e.target.value)} className="w-full h-12 px-4 rounded-xl bg-[#193322] border border-[#326744] text-white" placeholder="Ej: Mejora Cardiovascular" />
            </div>
            <div>
              <label className="text-white font-medium mb-2 block">Descripción</label>
              <textarea value={benefitDescription} onChange={(e) => setBenefitDescription(e.target.value)} className="w-full min-h-[120px] p-4 rounded-xl bg-[#193322] border border-[#326744] text-white" placeholder="Describe cómo beneficia al usuario" />
            </div>
            <div>
              <label className="text-white font-medium mb-2 block">Categorías</label>
              <p className="text-[#a9d8b9] text-sm mb-3">Selecciona las categorías que aplican:</p>
              <div className="flex flex-wrap gap-2">
                {availableCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => toggleCategory(cat)}
                    className={`px-3 py-2 rounded-full text-sm font-medium transition ${
                      benefitCategories.includes(cat)
                        ? 'bg-[#13ec5b] text-[#112217] border-2 border-[#13ec5b]'
                        : 'bg-[#193322] text-white border-2 border-[#326744] hover:border-[#13ec5b]/50'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="flex justify-between gap-3 mt-8 pt-6 border-t border-[#326744]">
            <button onClick={goPrev} className="flex items-center justify-center h-12 px-6 rounded-xl border border-[#326744] text-white font-bold hover:bg-[#23482f]"><ArrowLeft size={18} className="mr-2" /> Anterior</button>
            <button onClick={goNext} className="flex items-center justify-center h-12 px-6 rounded-xl bg-[#13ec5b] text-[#112217] font-bold hover:bg-opacity-90">Continuar <ArrowRight size={18} className="ml-2" /></button>
          </div>
        </section>
      </div>
    );
  }

  // Step 4: Instructions Editor
  if (step === 4) {
    const updateInstruction = (idx: number, value: string) => setInstructions(instructions.map((t, i) => i === idx ? value : t));
    const addInstruction = () => setInstructions([...instructions, '']);
    const removeInstruction = (idx: number) => setInstructions(instructions.filter((_, i) => i !== idx));
    return (
      <div className="max-w-4xl mx-auto flex flex-col gap-6 md:gap-8">
        <header className="flex items-center gap-4">
          <button onClick={goPrev} className="p-2 hover:bg-[#23482f] rounded-lg transition focus-visible:outline-[3px] focus-visible:outline-[#13ec5b] focus-visible:outline-offset-2" aria-label="Volver">
            <ArrowLeft size={24} className="text-white" />
          </button>
          <div className="flex flex-col gap-2">
            <h1 className="text-white text-2xl sm:text-3xl md:text-4xl font-black leading-tight">Paso 4: Instrucciones</h1>
            <p className="text-[#a9d8b9] text-sm sm:text-base leading-relaxed">Especifica pasos para ejecutar correctamente el ejercicio.</p>
          </div>
        </header>
        <section className="bg-[#112217] rounded-xl p-4 sm:p-6 md:p-8 border border-[#326744]">
          <div className="space-y-4">
            {instructions.map((text, idx) => (
              <div key={idx} className="bg-[#193322] p-4 rounded-lg border border-[#326744]">
                <label className="text-white font-medium mb-2 block">Paso {idx + 1}</label>
                <textarea value={text} onChange={(e) => updateInstruction(idx, e.target.value)} className="w-full min-h-[80px] p-3 rounded-xl bg-[#193322] border border-[#326744] text-white" placeholder="Describe el paso..." />
                <div className="flex justify-end mt-2">
                  <button onClick={() => removeInstruction(idx)} className="p-2 hover:bg-red-900/30 rounded text-red-400" aria-label="Eliminar paso"><X size={18} /></button>
                </div>
              </div>
            ))}
            <div className="flex justify-end">
              <button onClick={addInstruction} className="px-4 py-2 bg-[#23482f] text-white rounded-lg font-bold hover:bg-[#326744]">Añadir Paso</button>
            </div>
          </div>
          <div className="flex justify-between gap-3 mt-8 pt-6 border-t border-[#326744]">
            <button onClick={goPrev} className="flex items-center justify-center h-12 px-6 rounded-xl border border-[#326744] text-white font-bold hover:bg-[#23482f]"><ArrowLeft size={18} className="mr-2" /> Anterior</button>
            <button onClick={goNext} className="flex items-center justify-center h-12 px-6 rounded-xl bg-[#13ec5b] text-[#112217] font-bold hover:bg-opacity-90">Continuar <ArrowRight size={18} className="ml-2" /></button>
          </div>
        </section>
      </div>
    );
  }

  // Step 3: Multimedia Upload Screen
  if (step === 3) {
    return (
      <div className="max-w-4xl mx-auto flex flex-col gap-6 md:gap-8">
        <header className="flex items-center gap-4">
          <button 
            onClick={goPrev}
            className="p-2 hover:bg-[#23482f] rounded-lg transition focus-visible:outline-[3px] focus-visible:outline-[#13ec5b] focus-visible:outline-offset-2"
            aria-label="Volver a información básica"
          >
            <ArrowLeft size={24} className="text-white" />
          </button>
          <div className="flex flex-col gap-2">
            <h1 className="text-white text-2xl sm:text-3xl md:text-4xl font-black leading-tight">Paso 3: Contenido Multimedia</h1>
            <p className="text-[#a9d8b9] text-sm sm:text-base leading-relaxed">Agrega imágenes o videos demostrativos del ejercicio.</p>
          </div>
        </header>

        <section aria-labelledby="multimedia-heading" className="bg-[#112217] rounded-xl p-4 sm:p-6 md:p-8 border border-[#326744]">
          <h2 id="multimedia-heading" className="sr-only">Subir archivos multimedia</h2>
          
          <div 
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className="border-2 border-dashed border-[#326744] rounded-xl p-8 sm:p-12 hover:border-[#13ec5b]/50 transition-colors"
          >
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="bg-[#23482f] p-4 rounded-full text-white" aria-hidden>
                <Upload size={32} />
              </div>
              <div>
                <p className="text-white text-base sm:text-lg font-bold">Arrastra y suelta tus archivos aquí</p>
                <p className="text-[#a9d8b9] text-sm mt-1">Soporta JPG, PNG, MP4. Max 50MB por archivo.</p>
              </div>
              <button 
                type="button"
                onClick={handleSelectMedia}
                className="px-6 py-3 bg-[#13ec5b] text-[#112217] rounded-lg font-bold hover:bg-opacity-90 transition focus-visible:outline-[3px] focus-visible:outline-[#23482f] focus-visible:outline-offset-2"
              >
                Seleccionar Archivos
              </button>
            </div>
          </div>

          {mediaFiles.length > 0 && (
            <div className="mt-8">
              <h3 className="text-white text-base md:text-lg font-bold mb-4">{mediaFiles.length} archivo(s) seleccionado(s)</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {mediaFiles.map((file, index) => (
                  <div key={index} className="bg-[#193322] rounded-lg border border-[#326744] overflow-hidden">
                    <div className="aspect-video bg-[#23482f] relative">
                      {file.type.startsWith('image/') ? (
                        <img src={mediaPreviewUrls[index]} alt={file.name} className="w-full h-full object-cover" />
                      ) : (
                        <video src={mediaPreviewUrls[index]} className="w-full h-full object-cover" />
                      )}
                    </div>
                    <div className="p-4 flex items-center justify-between">
                      <div className="overflow-hidden flex-1">
                        <p className="text-white text-sm font-medium truncate">{file.name}</p>
                        <p className="text-[#a9d8b9] text-xs">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveMedia(index)}
                        className="p-2 hover:bg-red-900/30 rounded text-red-400 focus-visible:outline-[3px] focus-visible:outline-[#13ec5b] focus-visible:outline-offset-2 shrink-0 ml-2"
                        aria-label={`Eliminar ${file.name}`}
                      >
                        <X size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row justify-between gap-3 mt-8 pt-6 border-t border-[#326744]">
            <button 
              onClick={goPrev} 
              className="flex items-center justify-center h-12 px-6 rounded-xl border border-[#326744] text-white font-bold hover:bg-[#23482f] transition focus-visible:outline-[3px] focus-visible:outline-[#13ec5b] focus-visible:outline-offset-2"
            >
              <ArrowLeft size={18} className="mr-2" /> Anterior
            </button>
            <div className="flex gap-3">
              <button 
                onClick={goNext} 
                className="flex items-center justify-center h-12 px-6 rounded-xl bg-[#23482f] text-white font-bold hover:bg-[#326744] transition focus-visible:outline-[3px] focus-visible:outline-[#13ec5b] focus-visible:outline-offset-2"
              >
                Omitir
              </button>
              <button 
                onClick={goNext} 
                className="flex items-center justify-center h-12 px-6 rounded-xl bg-[#13ec5b] text-[#112217] font-bold hover:bg-opacity-90 transition focus-visible:outline-[3px] focus-visible:outline-[#23482f] focus-visible:outline-offset-2"
              >
                Continuar <ArrowRight size={18} className="ml-2" />
              </button>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // Step 2: Muscles Screen
  if (step === 2) {
    return (
      <div className="max-w-4xl mx-auto flex flex-col gap-6 md:gap-8">
        <header className="flex items-center gap-4">
          <button onClick={goPrev} className="p-2 hover:bg-[#23482f] rounded-lg transition focus-visible:outline-[3px] focus-visible:outline-[#13ec5b] focus-visible:outline-offset-2" aria-label="Volver">
            <ArrowLeft size={24} className="text-white" />
          </button>
          <div className="flex flex-col gap-2">
            <h1 className="text-white text-2xl sm:text-3xl md:text-4xl font-black leading-tight">Paso 2: Grupos Musculares</h1>
            <p className="text-[#a9d8b9] text-sm sm:text-base leading-relaxed">Selecciona el grupo muscular principal y secundario.</p>
          </div>
        </header>
        <section className="bg-[#112217] rounded-xl p-4 sm:p-6 md:p-8 border border-[#326744]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="exercise-muscle" className="text-white font-medium mb-2 block">Grupo Muscular Principal</label>
              <select 
                id="exercise-muscle"
                value={muscle}
                onChange={(e) => setMuscle(e.target.value)}
                className="w-full h-12 px-4 rounded-xl bg-[#193322] border border-[#326744] text-white focus:ring-2 focus:ring-[#13ec5b] focus:outline-none"
              >
                <option value="">Seleccionar músculo</option>
                <option value="Pecho">Pecho</option>
                <option value="Espalda">Espalda</option>
                <option value="Piernas">Piernas</option>
                <option value="Hombros">Hombros</option>
                <option value="Brazos">Brazos</option>
              </select>
            </div>
            <div>
              <label htmlFor="exercise-secondary" className="text-white font-medium mb-2 block">Grupo Muscular Secundario</label>
              <select 
                id="exercise-secondary"
                value={secondaryMuscle}
                onChange={(e) => setSecondaryMuscle(e.target.value)}
                className="w-full h-12 px-4 rounded-xl bg-[#193322] border border-[#326744] text-white focus:ring-2 focus:ring-[#13ec5b] focus:outline-none"
              >
                <option value="">Seleccionar grupo secundario</option>
                <option value="Pecho">Pecho</option>
                <option value="Espalda">Espalda</option>
                <option value="Piernas">Piernas</option>
                <option value="Hombros">Hombros</option>
                <option value="Brazos">Brazos</option>
              </select>
            </div>
          </div>
          <div className="flex justify-between gap-3 mt-8 pt-6 border-t border-[#326744]">
            <button onClick={goPrev} className="flex items-center justify-center h-12 px-6 rounded-xl border border-[#326744] text-white font-bold hover:bg-[#23482f]"><ArrowLeft size={18} className="mr-2" /> Anterior</button>
            <button onClick={goNext} className="flex items-center justify-center h-12 px-6 rounded-xl bg-[#13ec5b] text-[#112217] font-bold hover:bg-opacity-90">Continuar <ArrowRight size={18} className="ml-2" /></button>
          </div>
        </section>
      </div>
    );
  }

  // Step 1: Basic Info Form Screen
  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-6 md:gap-8">
      <header className="flex flex-col gap-2">
        <h1 className="text-white text-2xl sm:text-3xl md:text-4xl font-black leading-tight">Paso 1: Crear Nuevo Ejercicio</h1>
        <p className="text-[#a9d8b9] text-sm sm:text-base leading-relaxed">Introduce la información básica del ejercicio.</p>
      </header>

      <section aria-labelledby="exercise-form-heading">
        <h2 id="exercise-form-heading" className="sr-only">Formulario de nuevo ejercicio</h2>
        <div className="bg-[#112217] rounded-xl p-4 sm:p-6 md:p-8 border border-[#326744]">
          <form className="flex flex-col gap-6 md:gap-8" onSubmit={(e) => e.preventDefault()}>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-2 md:col-span-1">
              <label htmlFor="exercise-name" className="text-white font-medium mb-2 block">Nombre del Ejercicio</label>
              <input 
                id="exercise-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full h-12 px-4 rounded-xl bg-[#193322] border border-[#326744] text-white focus:ring-2 focus:ring-[#13ec5b] focus:outline-none placeholder-[#92c9a4]/50"
                placeholder="Ej: Press de Banca"
              />
            </div>
             <div className="col-span-2 md:col-span-1">
               <label htmlFor="exercise-equipment" className="text-white font-medium mb-2 block">Equipo Necesario</label>
               <select 
                 id="exercise-equipment"
                 value={equipment}
                 onChange={(e) => setEquipment(e.target.value)}
                 className="w-full h-12 px-4 rounded-xl bg-[#193322] border border-[#326744] text-white focus:ring-2 focus:ring-[#13ec5b] focus:outline-none"
               >
                 <option value="">Seleccionar equipo</option>
                 <option value="Barra">Barra</option>
                 <option value="Mancuernas">Mancuernas</option>
                 <option value="Máquina">Máquina</option>
                 <option value="Peso Corporal">Peso Corporal</option>
               </select>
             </div>
          </div>

          {/* Selección de músculos se mueve a Paso 2 */}

          <div className="col-span-2">
             <div className="flex justify-between items-center mb-2">
                <label className="text-white font-medium">Descripción</label>
                <button 
                  type="button"
                  onClick={handleGenerateAI}
                  disabled={isGenerating}
                  aria-live="polite"
                  className="flex items-center gap-1 text-xs font-bold text-[#112217] bg-[#13ec5b] px-3 py-1 rounded-full hover:bg-opacity-90 disabled:opacity-50 transition-all focus-visible:outline-[3px] focus-visible:outline-[#23482f] focus-visible:outline-offset-2"
                >
                  <Sparkles size={14} />
                  {isGenerating ? 'Generando...' : 'Generar con AI'}
                </button>
             </div>
             <textarea 
               id="exercise-description"
               value={description}
               onChange={(e) => setDescription(e.target.value)}
               className="w-full min-h-[150px] p-4 rounded-xl bg-[#193322] border border-[#326744] text-white focus:ring-2 focus:ring-[#13ec5b] focus:outline-none placeholder-[#92c9a4]/50 resize-y"
               placeholder="Describe el movimiento o usa el botón AI..."
             />
          </div>

          <div className="flex justify-end gap-4 pt-6 border-t border-[#326744]">
            <button onClick={handleCancel} type="button" className="flex items-center justify-center h-12 px-6 rounded-xl border border-[#326744] text-white font-bold hover:bg-[#23482f] transition focus-visible:outline-[3px] focus-visible:outline-[#13ec5b] focus-visible:outline-offset-2">
              <X size={18} className="mr-2" /> Cancelar
            </button>
            <button onClick={handleSave} type="button" className="flex items-center justify-center h-12 px-6 rounded-xl bg-[#13ec5b] text-[#112217] font-bold hover:bg-opacity-90 transition focus-visible:outline-[3px] focus-visible:outline-[#23482f] focus-visible:outline-offset-2">
              Continuar <ArrowRight size={18} className="ml-2" />
            </button>
          </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default CreateExercise;
