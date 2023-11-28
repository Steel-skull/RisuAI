import type { Pipeline, PretrainedOptions } from '@xenova/transformers';

let pipeline: (task: string, model?: string, { quantized, progress_callback, config, cache_dir, local_files_only, revision, }?: PretrainedOptions) => Promise<Pipeline> = null

async function loadTransformer() {
    if(!pipeline){
        const transformersLib = await import('@xenova/transformers')
        transformersLib.env.localModelPath = "https://sv.risuai.xyz/transformers/"
        pipeline = transformersLib.pipeline
    }
}
type TransformersBodyType = {
    max_new_tokens: number,
    do_sample: boolean,
    temperature: number,
    top_p: number,
    typical_p: number,
    repetition_penalty: number,
    encoder_repetition_penalty: number,
    top_k: number,
    min_length: number,
    no_repeat_ngram_size: number,
    num_beams: number,
    penalty_alpha: number,
    length_penalty: number,
    early_stopping: boolean,
    truncation_length: number,
    ban_eos_token: boolean,
    stopping_strings: number,
    seed: number,
    add_bos_token: boolean,
}


export const runTransformers = async (baseText:string, model:string,bodyTemplate:TransformersBodyType) => {
    await loadTransformer()
    let text = baseText
    let generator = await pipeline('text-generation', model);
    let output:{generated_text:string}[] = await generator(text);
    return output
}

export const runSummarizer = async (text: string) => {
    await loadTransformer()
    let classifier = await pipeline("summarization", "Xenova/distilbart-cnn-6-6")
    const v:{summary_text:string}[] = await classifier(text)
    return v
}

export const runEmbedding = async (text: string):Promise<Float32Array> => {
    await loadTransformer()
    let extractor = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');
    let result = await extractor(text, { pooling: 'mean', normalize: true });
    return result?.data ?? null;
}

export const runTTS = async (text: string) => {
    let speaker_embeddings = 'https://huggingface.co/datasets/Xenova/transformers.js-docs/resolve/main/speaker_embeddings.bin';
    let synthesizer = await pipeline('text-to-speech', 'Xenova/speecht5_tts', { local_files_only: true });
    let out = await synthesizer(text, { speaker_embeddings });
    return out
}