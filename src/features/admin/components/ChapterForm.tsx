import { type FormEvent, useEffect, useState } from "react";
import { Plus, Trash2, X } from "lucide-react";
import { ImageUpload } from "../../../components/ImageUpload";
import {
  slugify,
  type ChapterData,
  type ChapterInput,
  type LeaderData,
  type ProgramData,
} from "../../chapters/services/chapters";

interface ChapterFormProps {
  initial?: ChapterData;
  onSubmit: (data: ChapterInput) => Promise<void>;
  onCancel: () => void;
}

function emptyLeader(): LeaderData {
  return {
    id: crypto.randomUUID(),
    name: "",
    position: "",
    photo: "",
    email: "",
  };
}
function emptyProgram(): ProgramData {
  return { id: crypto.randomUUID(), title: "", description: "", image: "" };
}
function emptyGoal(): string {
  return "";
}

export function ChapterForm({ initial, onSubmit, onCancel }: ChapterFormProps) {
  // ── Basic info
  const [name, setName] = useState(initial?.name ?? "");
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [location, setLocation] = useState(initial?.location ?? "");
  const [country, setCountry] = useState(initial?.country ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [longDescription, setLongDescription] = useState(
    initial?.longDescription ?? "",
  );
  const [coverImage, setCoverImage] = useState(initial?.coverImage ?? "");

  // ── About
  const [history, setHistory] = useState(initial?.history ?? "");
  const [purpose, setPurpose] = useState(initial?.purpose ?? "");
  const [community, setCommunity] = useState(initial?.community ?? "");
  const [goals, setGoals] = useState<string[]>(
    initial?.goals?.length ? initial.goals : [""],
  );

  // ── Contact
  const [email, setEmail] = useState(initial?.email ?? "");
  const [phone, setPhone] = useState(initial?.phone ?? "");
  const [facebook, setFacebook] = useState(
    initial?.socialLinks?.facebook ?? "",
  );
  const [twitter, setTwitter] = useState(initial?.socialLinks?.twitter ?? "");
  const [instagram, setInstagram] = useState(
    initial?.socialLinks?.instagram ?? "",
  );

  // ── Leadership
  const [leaders, setLeaders] = useState<LeaderData[]>(
    initial?.leadership?.length ? initial.leadership : [emptyLeader()],
  );

  // ── Programs
  const [programs, setPrograms] = useState<ProgramData[]>(
    initial?.programs?.length ? initial.programs : [],
  );

  // ── Form state
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Auto-generate slug from name only when creating (no initial)
  useEffect(() => {
    if (!initial) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSlug(slugify(name));
    }
  }, [name, initial]);

  // ── Goals helpers
  const updateGoal = (i: number, val: string) =>
    setGoals((prev) => prev.map((g, idx) => (idx === i ? val : g)));
  const addGoal = () => setGoals((prev) => [...prev, emptyGoal()]);
  const removeGoal = (i: number) =>
    setGoals((prev) => prev.filter((_, idx) => idx !== i));

  // ── Leader helpers
  const updateLeader = (i: number, field: keyof LeaderData, val: string) =>
    setLeaders((prev) =>
      prev.map((l, idx) => (idx === i ? { ...l, [field]: val } : l)),
    );
  const addLeader = () => setLeaders((prev) => [...prev, emptyLeader()]);
  const removeLeader = (i: number) =>
    setLeaders((prev) => prev.filter((_, idx) => idx !== i));

  // ── Program helpers
  const updateProgram = (i: number, field: keyof ProgramData, val: string) =>
    setPrograms((prev) =>
      prev.map((p, idx) => (idx === i ? { ...p, [field]: val } : p)),
    );
  const addProgram = () => setPrograms((prev) => [...prev, emptyProgram()]);
  const removeProgram = (i: number) =>
    setPrograms((prev) => prev.filter((_, idx) => idx !== i));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    const cleanGoals = goals.filter((g) => g.trim() !== "");
    if (!name.trim()) {
      setError("Chapter name is required.");
      return;
    }
    if (!slug.trim()) {
      setError("Slug is required.");
      return;
    }
    if (!email.trim()) {
      setError("Contact email is required.");
      return;
    }
    if (cleanGoals.length === 0) {
      setError("Add at least one goal.");
      return;
    }

    const cleanLeaders = leaders
      .filter((l) => l.name.trim() && l.position.trim())
      .map((l) => ({
        id: l.id || crypto.randomUUID(),
        name: l.name.trim(),
        position: l.position.trim(),
        ...(l.photo?.trim() && { photo: l.photo.trim() }),
        ...(l.email?.trim() && { email: l.email.trim() }),
      }));

    const cleanPrograms = programs
      .filter((p) => p.title.trim() && p.description.trim())
      .map((p) => ({
        id: p.id || crypto.randomUUID(),
        title: p.title.trim(),
        description: p.description.trim(),
        ...(p.image?.trim() && { image: p.image.trim() }),
      }));

    const data: ChapterInput = {
      name: name.trim(),
      slug: slug.trim(),
      location: location.trim(),
      country: country.trim(),
      description: description.trim(),
      longDescription: longDescription.trim(),
      coverImage: coverImage.trim(),
      ...(history.trim() && { history: history.trim() }),
      ...(purpose.trim() && { purpose: purpose.trim() }),
      ...(community.trim() && { community: community.trim() }),
      goals: cleanGoals,
      email: email.trim(),
      ...(phone.trim() && { phone: phone.trim() }),
      socialLinks: {
        ...(facebook.trim() && { facebook: facebook.trim() }),
        ...(twitter.trim() && { twitter: twitter.trim() }),
        ...(instagram.trim() && { instagram: instagram.trim() }),
      },
      leadership: cleanLeaders,
      programs: cleanPrograms,
    };

    setSaving(true);
    try {
      await onSubmit(data);
    } catch {
      setError("Failed to save chapter. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-10 text-sm">
      {/* ── Section 1: Basic Info ── */}
      <section>
        <h3 className="text-base font-bold text-slate-800 mb-4 pb-2 border-b border-slate-100">
          Basic Information
        </h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <label className="block mb-1 font-semibold text-slate-700">
              Chapter Name <span className="text-red-500">*</span>
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className={inputClass}
              placeholder="e.g. Ottawa Chapter"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold text-slate-700">
              Slug (auto-generated) <span className="text-red-500">*</span>
            </label>
            <input
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              required
              className={inputClass}
              placeholder="ottawa-chapter"
            />
            <p className="mt-1 text-xs text-slate-400">
              Used in the URL: /chapters/{slug || "…"}
            </p>
          </div>

          <div>
            <label className="block mb-1 font-semibold text-slate-700">
              Location <span className="text-red-500">*</span>
            </label>
            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
              className={inputClass}
              placeholder="e.g. Ottawa, Canada"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold text-slate-700">
              Country <span className="text-red-500">*</span>
            </label>
            <input
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
              className={inputClass}
              placeholder="e.g. Canada"
            />
          </div>

          <div>
            <ImageUpload
              label="Cover Photo"
              currentUrl={coverImage}
              storagePath="images/chapters"
              onChange={setCoverImage}
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block mb-1 font-semibold text-slate-700">
              Short Description (card) <span className="text-red-500">*</span>
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows={2}
              className={inputClass}
              placeholder="1–2 sentences shown on the chapters listing page."
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block mb-1 font-semibold text-slate-700">
              Full Description <span className="text-red-500">*</span>
            </label>
            <textarea
              value={longDescription}
              onChange={(e) => setLongDescription(e.target.value)}
              required
              rows={4}
              className={inputClass}
              placeholder="Full about paragraph shown on the chapter detail page."
            />
          </div>
        </div>
      </section>

      {/* ── Section 2: About Content ── */}
      <section>
        <h3 className="text-base font-bold text-slate-800 mb-4 pb-2 border-b border-slate-100">
          About Content{" "}
          <span className="text-slate-400 font-normal text-xs">
            (optional but recommended)
          </span>
        </h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-semibold text-slate-700">
              Purpose
            </label>
            <textarea
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              rows={3}
              className={inputClass}
              placeholder="Why this chapter exists."
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold text-slate-700">
              Community Served
            </label>
            <textarea
              value={community}
              onChange={(e) => setCommunity(e.target.value)}
              rows={3}
              className={inputClass}
              placeholder="Who does this chapter serve?"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block mb-1 font-semibold text-slate-700">
              History
            </label>
            <textarea
              value={history}
              onChange={(e) => setHistory(e.target.value)}
              rows={3}
              className={inputClass}
              placeholder="How the chapter was founded."
            />
          </div>
        </div>

        {/* Goals */}
        <div className="mt-4">
          <label className="block mb-2 font-semibold text-slate-700">
            Goals <span className="text-red-500">*</span>
          </label>
          <div className="space-y-2">
            {goals.map((goal, i) => (
              <div key={i} className="flex gap-2">
                <input
                  value={goal}
                  onChange={(e) => updateGoal(i, e.target.value)}
                  className={inputClass + " flex-1"}
                  placeholder={`Goal ${i + 1}`}
                />
                {goals.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeGoal(i)}
                    className={removeBtn}
                  >
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
            ))}
          </div>
          <button type="button" onClick={addGoal} className={addRowBtn}>
            <Plus size={13} /> Add Goal
          </button>
        </div>
      </section>

      {/* ── Section 3: Contact ── */}
      <section>
        <h3 className="text-base font-bold text-slate-800 mb-4 pb-2 border-b border-slate-100">
          Contact Information
        </h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-semibold text-slate-700">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={inputClass}
              placeholder="chapter@ummad.org"
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold text-slate-700">
              Phone{" "}
              <span className="text-slate-400 font-normal">(optional)</span>
            </label>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={inputClass}
              placeholder="+1 (613) 555-0199"
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold text-slate-700">
              Facebook{" "}
              <span className="text-slate-400 font-normal">(optional)</span>
            </label>
            <input
              value={facebook}
              onChange={(e) => setFacebook(e.target.value)}
              className={inputClass}
              placeholder="https://facebook.com/…"
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold text-slate-700">
              Twitter / X{" "}
              <span className="text-slate-400 font-normal">(optional)</span>
            </label>
            <input
              value={twitter}
              onChange={(e) => setTwitter(e.target.value)}
              className={inputClass}
              placeholder="https://twitter.com/…"
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold text-slate-700">
              Instagram{" "}
              <span className="text-slate-400 font-normal">(optional)</span>
            </label>
            <input
              value={instagram}
              onChange={(e) => setInstagram(e.target.value)}
              className={inputClass}
              placeholder="https://instagram.com/…"
            />
          </div>
        </div>
      </section>

      {/* ── Section 4: Leadership ── */}
      <section>
        <h3 className="text-base font-bold text-slate-800 mb-4 pb-2 border-b border-slate-100">
          Leadership Team{" "}
          <span className="text-slate-400 font-normal text-xs">
            (at least one recommended)
          </span>
        </h3>
        <div className="space-y-4">
          {leaders.map((leader, i) => (
            <div
              key={leader.id}
              className="bg-slate-50 rounded-xl p-4 border border-slate-100 relative"
            >
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-3">
                Member {i + 1}
              </p>
              {leaders.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeLeader(i)}
                  className="absolute top-4 right-4 p-1 text-slate-400 hover:text-red-600 transition-colors"
                >
                  <X size={15} />
                </button>
              )}
              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="block mb-1 text-xs font-semibold text-slate-600">
                    Name *
                  </label>
                  <input
                    value={leader.name}
                    onChange={(e) => updateLeader(i, "name", e.target.value)}
                    className={inputClass}
                    placeholder="Full name"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-xs font-semibold text-slate-600">
                    Position *
                  </label>
                  <input
                    value={leader.position}
                    onChange={(e) =>
                      updateLeader(i, "position", e.target.value)
                    }
                    className={inputClass}
                    placeholder="e.g. Chapter President"
                  />
                </div>
                <div>
                  <ImageUpload
                    label="Photo"
                    currentUrl={leader.photo ?? ""}
                    storagePath="images/leaders"
                    onChange={(url) => updateLeader(i, "photo", url)}
                    optional
                  />
                </div>
                <div>
                  <label className="block mb-1 text-xs font-semibold text-slate-600">
                    Email{" "}
                    <span className="text-slate-400 font-normal">
                      (optional)
                    </span>
                  </label>
                  <input
                    type="email"
                    value={leader.email ?? ""}
                    onChange={(e) => updateLeader(i, "email", e.target.value)}
                    className={inputClass}
                    placeholder="leader@ummad.org"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        <button type="button" onClick={addLeader} className={addRowBtn}>
          <Plus size={13} /> Add Leader
        </button>
      </section>

      {/* ── Section 5: Programs ── */}
      <section>
        <h3 className="text-base font-bold text-slate-800 mb-4 pb-2 border-b border-slate-100">
          Programs &amp; Initiatives{" "}
          <span className="text-slate-400 font-normal text-xs">(optional)</span>
        </h3>
        {programs.length === 0 && (
          <p className="text-sm text-slate-400 mb-3">
            No programs added yet. You can add them later.
          </p>
        )}
        <div className="space-y-4">
          {programs.map((prog, i) => (
            <div
              key={prog.id}
              className="bg-slate-50 rounded-xl p-4 border border-slate-100 relative"
            >
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-3">
                Program {i + 1}
              </p>
              <button
                type="button"
                onClick={() => removeProgram(i)}
                className="absolute top-4 right-4 p-1 text-slate-400 hover:text-red-600 transition-colors"
              >
                <X size={15} />
              </button>
              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="block mb-1 text-xs font-semibold text-slate-600">
                    Title *
                  </label>
                  <input
                    value={prog.title}
                    onChange={(e) => updateProgram(i, "title", e.target.value)}
                    className={inputClass}
                    placeholder="Program name"
                  />
                </div>
                <div>
                  <ImageUpload
                    label="Program Image"
                    currentUrl={prog.image ?? ""}
                    storagePath="images/programs"
                    onChange={(url) => updateProgram(i, "image", url)}
                    optional
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block mb-1 text-xs font-semibold text-slate-600">
                    Description *
                  </label>
                  <textarea
                    value={prog.description}
                    onChange={(e) =>
                      updateProgram(i, "description", e.target.value)
                    }
                    rows={2}
                    className={inputClass}
                    placeholder="What does this program do?"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        <button type="button" onClick={addProgram} className={addRowBtn}>
          <Plus size={13} /> Add Program
        </button>
      </section>

      {/* ── Error + Actions ── */}
      {error && (
        <p className="text-sm font-medium text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
          {error}
        </p>
      )}

      <div className="flex justify-end gap-3 pt-2 border-t border-slate-100">
        <button
          type="button"
          onClick={onCancel}
          className="px-5 py-2.5 rounded-lg border border-slate-200 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={saving}
          className="px-6 py-2.5 rounded-lg bg-sky-700 text-white text-sm font-semibold hover:bg-sky-800 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {saving ? "Saving…" : initial ? "Save Changes" : "Create Chapter"}
        </button>
      </div>
    </form>
  );
}

const inputClass =
  "w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500";

const removeBtn =
  "p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors flex-shrink-0";

const addRowBtn =
  "mt-3 inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-dashed border-slate-300 text-xs font-semibold text-slate-500 hover:border-sky-500 hover:text-sky-700 transition-colors";
