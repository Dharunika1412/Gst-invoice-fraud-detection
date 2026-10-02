import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle2, FileSpreadsheet, UploadCloud, X } from "lucide-react";
import PageHeader from "../components/ui/PageHeader.jsx";

const ACCEPTED = [".csv", ".xlsx", ".json"];

export default function InvoiceUpload() {
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState("");
  const [progress, setProgress] = useState(null);

  const choose = (selected) => {
    if (!selected) return;
    const ok = ACCEPTED.some((ext) => selected.name.toLowerCase().endsWith(ext));
    if (!ok) {
      setFile(null);
      setError(`Unsupported file type. Upload a ${ACCEPTED.join(", ")} file.`);
      return;
    }
    setError("");
    setProgress(null);
    setFile(selected);
  };

  const analyse = () => {
    setProgress(0);
    const timer = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(timer);
          setTimeout(() => navigate("/results"), 400);
          return 100;
        }
        return p + 10;
      });
    }, 180);
  };

  const running = progress !== null;

  return (
    <>
      <PageHeader
        title="Upload invoices"
        description="Import a purchase register export. Each invoice is scored against the supplier's history."
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <section className="card p-5 lg:col-span-2">
          <div
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => { e.preventDefault(); setDragging(false); choose(e.dataTransfer.files[0]); }}
            className={`flex flex-col items-center rounded-xl border-2 border-dashed px-6 py-14 text-center transition-colors ${
              dragging ? "border-brand-600 bg-brand-50" : "border-line bg-canvas"
            }`}
          >
            <UploadCloud size={36} className="text-brand-600" aria-hidden="true" />
            <p className="mt-3 font-medium">Drop your file here</p>
            <p className="mt-1 text-sm text-muted">CSV, XLSX or JSON, up to 10 MB</p>
            <button type="button" className="btn-secondary mt-5" onClick={() => inputRef.current?.click()} disabled={running}>
              Choose file
            </button>
            <input ref={inputRef} type="file" accept={ACCEPTED.join(",")} className="sr-only" onChange={(e) => choose(e.target.files[0])} aria-label="Choose invoice file" />
          </div>

          {error && <p role="alert" className="mt-4 rounded-lg bg-risk-highbg px-3 py-2 text-sm text-risk-high">{error}</p>}

          {file && (
            <div className="mt-4 rounded-lg border border-line p-4">
              <div className="flex items-center gap-3">
                <FileSpreadsheet size={22} className="text-brand-600" aria-hidden="true" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{file.name}</p>
                  <p className="text-xs text-muted">{(file.size / 1024).toFixed(1)} KB</p>
                </div>
                {progress === 100 ? (
                  <CheckCircle2 size={20} className="text-risk-low" aria-label="Analysis complete" />
                ) : (
                  <button className="rounded-md p-1 text-muted hover:bg-canvas" onClick={() => { setFile(null); setProgress(null); }} disabled={running} aria-label="Remove file">
                    <X size={18} />
                  </button>
                )}
              </div>
              {running && (
                <div className="mt-3">
                  <div className="h-2 overflow-hidden rounded-full bg-canvas" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
                    <div className="h-full bg-brand-600 transition-all" style={{ width: `${progress}%` }} />
                  </div>
                  <p className="mt-1.5 text-xs text-muted">{progress < 100 ? "Scoring invoices" : "Analysis complete. Opening results"}</p>
                </div>
              )}
            </div>
          )}

          <div className="mt-5 flex justify-end">
            <button className="btn-primary" disabled={!file || running} onClick={analyse}>Run fraud analysis</button>
          </div>
        </section>

        <aside className="card p-5">
          <h2 className="font-semibold">Expected columns</h2>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            <li>Invoice number</li>
            <li>Invoice date</li>
            <li>Supplier name</li>
            <li>Supplier GSTIN</li>
            <li>Taxable value and tax amount</li>
            <li>HSN code</li>
          </ul>
          <p className="mt-4 text-xs text-muted">In this demo the upload is not sent anywhere. Any valid file opens the sample results.</p>
        </aside>
      </div>
    </>
  );
}
