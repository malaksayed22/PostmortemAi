"use client";

const baseInput =
  "w-full rounded-lg border border-slate-700 bg-slate-900 px-3.5 py-2.5 text-base sm:text-sm text-white placeholder:text-slate-600 transition-all duration-150 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20";

export function FieldLabel({ htmlFor, children, required }) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-400"
    >
      {children}
      {required && <span className="ml-1 text-indigo-400">*</span>}
    </label>
  );
}

export function FieldError({ message }) {
  if (!message) return null;
  return (
    <p className="mt-1.5 flex items-center gap-1 text-xs text-red-400">
      <span>⚠</span> {message}
    </p>
  );
}

export function TextInput({ id, value, onChange, placeholder, error, ...props }) {
  return (
    <div>
      <input
        id={id}
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`${baseInput} ${error ? "border-red-500/70 focus:border-red-500 focus:ring-red-500/20" : ""}`}
        {...props}
      />
      <FieldError message={error} />
    </div>
  );
}

export function NumberInput({ id, value, onChange, placeholder, error, ...props }) {
  return (
    <div>
      <input
        id={id}
        type="number"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`${baseInput} ${error ? "border-red-500/70" : ""}`}
        {...props}
      />
      <FieldError message={error} />
    </div>
  );
}

export function DateTimeInput({ id, value, onChange, error, ...props }) {
  return (
    <div>
      <input
        id={id}
        type="datetime-local"
        value={value}
        onChange={onChange}
        className={`${baseInput} [color-scheme:dark] ${error ? "border-red-500/70" : ""}`}
        {...props}
      />
      <FieldError message={error} />
    </div>
  );
}

export function SelectInput({ id, value, onChange, options, placeholder, error }) {
  return (
    <div>
      <select
        id={id}
        value={value}
        onChange={onChange}
        className={`${baseInput} ${error ? "border-red-500/70" : ""}`}
      >
        <option value="" className="bg-slate-900 text-slate-500">
          {placeholder || "Select an option..."}
        </option>
        {options.map((opt) => (
          <option key={opt} value={opt} className="bg-slate-900 text-white">
            {opt}
          </option>
        ))}
      </select>
      <FieldError message={error} />
    </div>
  );
}

export function TextareaInput({ id, value, onChange, placeholder, rows = 4, error }) {
  return (
    <div>
      <textarea
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        className={`${baseInput} resize-none leading-relaxed ${error ? "border-red-500/70" : ""}`}
      />
      <FieldError message={error} />
    </div>
  );
}

export function FieldGroup({ children }) {
  return <div className="space-y-1.5">{children}</div>;
}
