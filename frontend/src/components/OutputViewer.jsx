import { useState } from 'react';
import { Copy, Download, Code, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

export function OutputViewer({ markdown, fileName = 'README.md' }) {
  const [activeTab, setActiveTab] = useState('code');
  const { toast } = useToast();

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(markdown);
      toast({
        title: "Copied!",
        description: "README content copied to clipboard.",
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to copy to clipboard.",
        variant: "destructive",
      });
    }
  };

  const downloadFile = () => {
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Downloaded!",
      description: `${fileName} has been downloaded.`,
    });
  };

  if (!markdown) {
    return (
      <Card className="h-full">
        <CardContent className="flex items-center justify-center h-64">
          <p className="text-muted-foreground">Generate a README to see the output</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center justify-between h-full">
          <CardTitle>Generated README</CardTitle>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={copyToClipboard}>
              <Copy className="w-4 h-4" />
              Copy
            </Button>
            <Button variant="outline" size="sm" onClick={downloadFile}>
              <Download className="w-4 h-4" />
              Download
            </Button>
          </div>
        </div>
        
        {/* Tab Navigation */}
        <div className="flex border-b h-full">
          <button
            className={`px-4 py-2 text-sm font-medium rounded-t-md transition-colors ${
              activeTab === 'code' ? 'tab-active' : 'tab-inactive'
            }`}
            onClick={() => setActiveTab('code')}
          >
            <Code className="w-4  inline mr-2" />
            Markdown
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium rounded-t-md transition-colors  ${
              activeTab === 'preview' ? 'tab-active' : 'tab-inactive'
            }`}
            onClick={() => setActiveTab('preview')}
          >
            <Eye className="w-4  inline mr-2" />
            Preview
          </button>
        </div>
      </CardHeader>
      
      <CardContent className="p-0 h-full">
        {activeTab === 'code' ? (
          <div className="code-block m-4 h-full overflow-auto">
            <pre className="whitespace-pre-wrap text-sm">{markdown}</pre>
          </div>
        ) : (
          <div className="p-6 h-full overflow-auto prose prose-sm dark:prose-invert max-w-none">
            <ReactMarkdown rehypePlugins={[rehypeRaw]}>{markdown}</ReactMarkdown>
          </div>
        )}
      </CardContent>
    </Card>
  );
}