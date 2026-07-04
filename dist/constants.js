export const OPEN_WIKI_DIR = "openwiki";
export const UPDATE_METADATA_PATH = `${OPEN_WIKI_DIR}/.last-update.json`;
export const BASETEN_API_KEY_ENV_KEY = "BASETEN_API_KEY";
export const FIREWORKS_API_KEY_ENV_KEY = "FIREWORKS_API_KEY";
export const OPENAI_API_KEY_ENV_KEY = "OPENAI_API_KEY";
export const ANTHROPIC_API_KEY_ENV_KEY = "ANTHROPIC_API_KEY";
export const OPENROUTER_API_KEY_ENV_KEY = "OPENROUTER_API_KEY";
export const OLLAMA_API_KEY_ENV_KEY = "OLLAMA_API_KEY";
export const OPENWIKI_PROVIDER_ENV_KEY = "OPENWIKI_PROVIDER";
export const OPENWIKI_MODEL_ID_ENV_KEY = "OPENWIKI_MODEL_ID";
export const DEFAULT_PROVIDER = "openrouter";
export const OPENROUTER_BASE_URL = "https://openrouter.ai/api/v1";
export const OLLAMA_BASE_URL = "https://ollama.com/v1";
export const SELECTABLE_OPENWIKI_PROVIDERS = [
    "ollama",
    "openrouter",
    "baseten",
    "fireworks",
    "openai",
    "anthropic",
];
export const PROVIDER_CONFIGS = {
    ollama: {
        apiKeyEnvKey: OLLAMA_API_KEY_ENV_KEY,
        baseURL: OLLAMA_BASE_URL,
        label: "Ollama Cloud",
        // qwen3-coder is the default: it reliably emits well-formed tool-call
        // arguments across long agent runs on large repos. glm-5.2 emits broken
        // tool JSON deep into big runs and is kept only as a selectable fallback.
        modelOptions: [
            { id: "qwen3-coder:480b", label: "Qwen3 Coder 480B" },
            { id: "kimi-k2.7-code", label: "Kimi K2.7 Code" },
            { id: "glm-5.2", label: "GLM 5.2" },
        ],
    },
    baseten: {
        apiKeyEnvKey: BASETEN_API_KEY_ENV_KEY,
        baseURL: "https://inference.baseten.co/v1",
        label: "Baseten",
        modelOptions: [
            { id: "zai-org/GLM-5.2", label: "GLM 5.2" },
            { id: "moonshotai/Kimi-K2.7-Code", label: "Kimi K2.7 Code" },
        ],
    },
    fireworks: {
        apiKeyEnvKey: FIREWORKS_API_KEY_ENV_KEY,
        baseURL: "https://api.fireworks.ai/inference/v1",
        label: "Fireworks",
        modelOptions: [
            { id: "accounts/fireworks/models/glm-5p2", label: "GLM 5.2" },
            {
                id: "accounts/fireworks/models/kimi-k2p7-code",
                label: "Kimi K2.7 Code",
            },
        ],
    },
    openai: {
        apiKeyEnvKey: OPENAI_API_KEY_ENV_KEY,
        label: "OpenAI",
        modelOptions: [
            { id: "gpt-5.4-mini", label: "5.4 mini" },
            { id: "gpt-5.5", label: "5.5" },
        ],
    },
    anthropic: {
        apiKeyEnvKey: ANTHROPIC_API_KEY_ENV_KEY,
        label: "Anthropic",
        modelOptions: [
            { id: "claude-haiku-4-5", label: "Haiku" },
            { id: "claude-sonnet-5", label: "Sonnet" },
            { id: "claude-opus-4.8", label: "Opus" },
        ],
    },
    openrouter: {
        apiKeyEnvKey: OPENROUTER_API_KEY_ENV_KEY,
        baseURL: OPENROUTER_BASE_URL,
        label: "OpenRouter",
        modelOptions: [
            { id: "z-ai/glm-5.2", label: "GLM 5.2" },
            { id: "openrouter/fusion", label: "OpenRouter Fusion" },
            { id: "moonshotai/kimi-k2.7-code", label: "Kimi K2.7 Code" },
            { id: "anthropic/claude-opus-4.8", label: "Claude Opus" },
            { id: "anthropic/claude-sonnet-5", label: "Claude Sonnet" },
            { id: "openai/gpt-5.4-mini", label: "GPT 5.4 mini" },
            { id: "openai/gpt-5.5", label: "GPT 5.5" },
        ],
    },
};
export const DEFAULT_MODEL_ID = PROVIDER_CONFIGS[DEFAULT_PROVIDER].modelOptions[0]?.id ?? "zai-org/GLM-5.2";
export const OPENROUTER_FALLBACK_MODEL_IDS = [
    "openai/gpt-5.4-mini",
    "anthropic/claude-sonnet-5",
];
export const SUGGESTED_MODEL_IDS = PROVIDER_CONFIGS[DEFAULT_PROVIDER].modelOptions.map((model) => model.id);
export function getProviderConfig(provider) {
    return PROVIDER_CONFIGS[provider];
}
export function getProviderLabel(provider) {
    return getProviderConfig(provider).label;
}
export function getProviderApiKeyEnvKey(provider) {
    return getProviderConfig(provider).apiKeyEnvKey;
}
export function getProviderModelOptions(provider) {
    return getProviderConfig(provider).modelOptions;
}
export function getDefaultModelId(provider) {
    return getProviderModelOptions(provider)[0]?.id ?? DEFAULT_MODEL_ID;
}
export function normalizeProvider(value) {
    if (value === undefined || value === null) {
        return null;
    }
    const provider = value.trim().toLowerCase();
    return isValidProvider(provider) ? provider : null;
}
export function isValidProvider(value) {
    return value in PROVIDER_CONFIGS;
}
export function resolveConfiguredProvider(env = process.env) {
    return (normalizeProvider(env[OPENWIKI_PROVIDER_ENV_KEY]) ??
        (env[OPENROUTER_API_KEY_ENV_KEY] ? "openrouter" : DEFAULT_PROVIDER));
}
export function normalizeModelId(value) {
    return value.trim();
}
export function isValidModelId(value) {
    const modelId = normalizeModelId(value);
    return (modelId.length > 0 &&
        modelId.length <= 120 &&
        /^[A-Za-z0-9][A-Za-z0-9._:/+-]*$/u.test(modelId) &&
        !modelId.includes("://"));
}
export const OPENWIKI_VERSION = "0.0.1";
