import React, { useEffect, useRef } from 'react';

const AGENT_ID = 'agent_3701m6qtkg65fssvj6x4xt6mckyw';
const WIDGET_SCRIPT_ID = 'elevenlabs-convai-widget-script';
const WIDGET_SCRIPT_SRC = 'https://unpkg.com/@elevenlabs/convai-widget-embed';

export const ElevenLabsWidget: React.FC = () => {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let widget = host.querySelector('elevenlabs-convai') as HTMLElement | null;

    if (!widget) {
      widget = document.createElement('elevenlabs-convai');
      widget.setAttribute('agent-id', AGENT_ID);
      widget.setAttribute('action-text', 'Ask my AI assistant');
      widget.setAttribute('start-call-text', 'Start a conversation');
      widget.setAttribute('expand-text', 'Chat with me');
      widget.setAttribute('avatar-orb-color-1', '#8B5CF6');
      widget.setAttribute('avatar-orb-color-2', '#22D3EE');
      widget.style.position = 'fixed';
      widget.style.right = '24px';
      widget.style.bottom = '24px';
      widget.style.zIndex = '9999';
      host.appendChild(widget);
    }

    if (!document.getElementById(WIDGET_SCRIPT_ID)) {
      const script = document.createElement('script');
      script.id = WIDGET_SCRIPT_ID;
      script.src = WIDGET_SCRIPT_SRC;
      script.async = true;
      script.type = 'text/javascript';
      document.body.appendChild(script);
    }

    return () => {
      widget?.remove();
    };
  }, []);

  return <div ref={hostRef} aria-label="ElevenLabs AI assistant" />;
};

export default ElevenLabsWidget;
