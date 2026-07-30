import { useState, type FormEvent } from "react";
import { useChapters } from "../../chapters/hooks/useChapters";
import type { EventData, EventInput } from "../../events/services/events";
import { ImageUpload } from "../../../components/ImageUpload";

const EVENT_CATEGORIES = [
  "Fundraiser",
  "Youth",
  "Community",
  "Health",
  "Education",
  "Culture",
  "Conference",
  "Workshop",
  "Other",
];

interface EventFormProps {
  initial?: EventData;
  onSubmit: (data: EventInput) => Promise<void>;
  onCancel: () => void;
  /** If provided, locks the chapter to this ID (chapter editor mode) */
  lockedChapterId?: string;
  lockedChapterName?: string;
}

export function EventForm({ initial, onSubmit, onCancel, lockedChapterId, lockedChapterName }: EventFormProps) {
  const { chapters, loading: chaptersLoading } = useChapters();

  const [title, setTitle] = useState(initial?.title ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [fullDescription, setFullDescription] = useState(
    initial?.fullDescription ?? "",
  );
  const [image, setImage] = useState(initial?.image ?? "");
  const [date, setDate] = useState(initial?.date ?? "");
  const [time, setTime] = useState(initial?.time ?? "");
  const [endDate, setEndDate] = useState(initial?.endDate ?? "");
  const [location, setLocation] = useState(initial?.location ?? "");
  const [address, setAddress] = useState(initial?.address ?? "");
  const [chapterId, setChapterId] = useState(lockedChapterId ?? initial?.chapterId ?? "");
  const [category, setCategory] = useState(initial?.category ?? "");
  const [registrationUrl, setRegistrationUrl] = useState(
    initial?.registrationUrl ?? "",
  );
  const [isFree, setIsFree] = useState(initial?.isFree ?? true);
  const [capacity, setCapacity] = useState(initial?.capacity?.toString() ?? "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const chapterName = lockedChapterName ?? chapters.find((c) => c.id === chapterId)?.name ?? "";

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!title.trim()) {
      setError("Title is required.");
      return;
    }
    if (!description.trim()) {
      setError("Short description is required.");
      return;
    }
    if (!date) {
      setError("Event date is required.");
      return;
    }
    if (!location.trim()) {
      setError("Location is required.");
      return;
    }
    if (!chapterId) {
      setError("Please select a chapter.");
      return;
    }
    if (!category) {
      setError("Please select a category.");
      return;
    }
    setError("");
    setSaving(true);
    try {
      await onSubmit({
        title: title.trim(),
        description: description.trim(),
        fullDescription: fullDescription.trim(),
        image: image.trim() || undefined,
        date,
        time: time.trim(),
        endDate: endDate || undefined,
        location: location.trim(),
        address: address.trim() || undefined,
        chapterId,
        chapterName,
        category,
        registrationUrl: registrationUrl.trim() || undefined,
        isFree,
        capacity: capacity ? parseInt(capacity, 10) : undefined,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save.");
      setSaving(false);
    }
  }

  const inp =
    "w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-sky-500 transition-colors";
  const lbl =
    "block text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-2.5">
          {error}
        </p>
      )}

      {/* Title */}
      <div>
        <label className={lbl}>Title *</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Event title"
          className={inp}
        />
      </div>

      {/* Short description */}
      <div>
        <label className={lbl}>Short Description *</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={2}
          placeholder="Brief summary shown on event cards..."
          className={inp + " resize-y"}
        />
      </div>

      {/* Full description */}
      <div>
        <label className={lbl}>Full Description</label>
        <textarea
          value={fullDescription}
          onChange={(e) => setFullDescription(e.target.value)}
          rows={6}
          placeholder="Detailed event description, schedule, etc..."
          className={inp + " resize-y"}
        />
      </div>

      {/* Date + Time + End Date */}
      <div className="grid sm:grid-cols-3 gap-4">
        <div>
          <label className={lbl}>Start Date *</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className={inp}
          />
        </div>
        <div>
          <label className={lbl}>Time</label>
          <input
            value={time}
            onChange={(e) => setTime(e.target.value)}
            placeholder="e.g. 6:00 PM – 10:00 PM"
            className={inp}
          />
        </div>
        <div>
          <label className={lbl}>End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className={inp}
          />
        </div>
      </div>

      {/* Location + Address */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className={lbl}>Location / Venue *</label>
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Venue name or city"
            className={inp}
          />
        </div>
        <div>
          <label className={lbl}>Address</label>
          <input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Street address"
            className={inp}
          />
        </div>
      </div>

      {/* Chapter + Category */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className={lbl}>Chapter *</label>
          {lockedChapterId ? (
            <div className={inp + " bg-slate-50 text-slate-500 cursor-not-allowed"}>
              {lockedChapterName ?? lockedChapterId}
            </div>
          ) : (
            <select
              value={chapterId}
              onChange={(e) => setChapterId(e.target.value)}
              disabled={chaptersLoading}
              className={inp}
            >
              <option value="">{chaptersLoading ? "Loading…" : "Select…"}</option>
              {chapters.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          )}
        </div>
        <div>
          <label className={lbl}>Category *</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={inp}
          >
            <option value="">Select…</option>
            {EVENT_CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Image + Registration URL */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <ImageUpload
            label="Cover Photo"
            currentUrl={image}
            storagePath="images/events"
            onChange={setImage}
            optional
          />
        </div>
        <div>
          <label className={lbl}>Registration URL</label>
          <input
            value={registrationUrl}
            onChange={(e) => setRegistrationUrl(e.target.value)}
            placeholder="https://..."
            className={inp}
          />
        </div>
      </div>

      {/* Ticket type + Capacity */}
      <div className="grid sm:grid-cols-2 gap-4 items-end">
        <div>
          <label className={lbl}>Ticket Type</label>
          <div className="flex gap-3 pt-1">
            {(
              [
                { val: true, label: "Free" },
                { val: false, label: "Paid" },
              ] as const
            ).map(({ val, label }) => (
              <button
                key={label}
                type="button"
                onClick={() => setIsFree(val)}
                className={`flex-1 py-2.5 rounded-lg text-sm font-semibold border transition-colors ${
                  isFree === val
                    ? "bg-sky-700 text-white border-sky-700"
                    : "bg-white text-slate-600 border-slate-200 hover:border-sky-300"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className={lbl}>Capacity</label>
          <input
            type="number"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
            placeholder="e.g. 200"
            min="1"
            className={inp}
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3 pt-2 border-t border-slate-100">
        <button
          type="button"
          onClick={onCancel}
          className="px-5 py-2.5 text-sm font-semibold text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={saving}
          className="px-5 py-2.5 text-sm font-semibold text-white bg-sky-700 rounded-lg hover:bg-sky-800 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {saving ? "Saving…" : initial ? "Update Event" : "Create Event"}
        </button>
      </div>
    </form>
  );
}
