import type { VoiceChatFxType } from '@/enums/voice-chat-fx';

export interface VoiceChatFx<TSettings> {
    handle: number;
    priority: number;

    applySettings(settings: TSettings): void;
}

export type VoiceChatFxSettingsMap = {
    [VoiceChatFxType.CHORUS]: VoiceChatFxChorusSettings;
    [VoiceChatFxType.COMPRESSOR]: VoiceChatFxCompressorSettings;
    [VoiceChatFxType.DISTORTION]: VoiceChatFxDistortionSettings;
    [VoiceChatFxType.ECHO]: VoiceChatFxEchoSettings;
    [VoiceChatFxType.FLANGER]: VoiceChatFxFlangerSettings;
    [VoiceChatFxType.GARGLE]: VoiceChatFxGargleSettings;
    [VoiceChatFxType.I3DL2REVERB]: VoiceChatFxI3DL2ReverbSettings;
    [VoiceChatFxType.PARAMEQ]: VoiceChatFxParamEqSettings;
    [VoiceChatFxType.REVERB]: VoiceChatFxReverbSettings;
    [VoiceChatFxType.VOLUME]: VoiceChatFxVolumeSettings;
    [VoiceChatFxType.PEAKEQ]: VoiceChatFxPeakEqSettings;
    [VoiceChatFxType.BQF]: VoiceChatFxBQFSettings;
};

interface VoiceChatFxChorusSettings {
    fWetDryMix: number;
    fDepth: number;
    fFeedback: number;
    fFrequency: number;
    lWaveform: number;
    fDelay: number;
    lPhase: RageEnums.Voice.BASSFXPhase;
}

interface VoiceChatFxCompressorSettings {
    fGain: number;
    fAttack: number;
    fRelease: number;
    fThreshold: number;
    fRatio: number;
    fPredelay: number;
}

interface VoiceChatFxDistortionSettings {
    fGain: number;
    fEdge: number;
    fPostEQCenterFrequency: number;
    fPostEQBandwidth: number;
    fPreLowpassCutoff: number;
}

interface VoiceChatFxEchoSettings {
    fWetDryMix: number;
    fFeedback: number;
    fLeftDelay: number;
    fRightDelay: number;
    lPanDelay: number;
}

interface VoiceChatFxFlangerSettings {
    fWetDryMix: number;
    fDepth: number;
    fFeedback: number;
    fFrequency: number;
    lWaveform: number;
    fDelay: number;
    lPhase: RageEnums.Voice.BASSFXPhase;
}

interface VoiceChatFxGargleSettings {
    dwRateHz: number;
    dwWaveShape: number;
}

interface VoiceChatFxI3DL2ReverbSettings {
    lRoom: number;
    lRoomHF: number;
    flRoomRolloffFactor: number;
    flDecayTime: number;
    flDecayHFRatio: number;
    lReflections: number;
    flReflectionsDelay: number;
    lReverb: number;
    flReverbDelay: number;
    flDiffusion: number;
    flDensity: number;
    flHFReference: number;
}

interface VoiceChatFxParamEqSettings {
    fCenter: number;
    fBandwidth: number;
    fGain: number;
}

interface VoiceChatFxReverbSettings {
    fInGain: number;
    fReverbMix: number;
    fReverbTime: number;
    fHighFreqRTRatio: number;
}

interface VoiceChatFxVolumeSettings {
    fTarget: number;
    fCurrent: number;
    fTime: number;
    lCurve: number;
}

interface VoiceChatFxPeakEqSettings {
    lBand: number;
    fBandwidth: number;
    fQ: number;
    fCenter: number;
    fGain: number;
    lChannel: RageEnums.Voice.BASSFXChan;
}

interface VoiceChatFxBQFSettings {
    lFilter: number;
    fCenter: number;
    fGain: number;
    fBandwidth: number;
    fQ: number;
    fS: number;
    lChannel: RageEnums.Voice.BASSFXChan;
}
