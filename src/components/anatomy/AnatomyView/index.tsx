import * as React from "react";
import { useEffect, useMemo } from "react";
import { useHistory, useParams } from "react-router";
import * as _ from "lodash";

import { ICmsAnatomy } from "next-shared/src/types/ICmsAnatomy";
import { ICameraPosition } from "next-shared/src/types/ICameraPosition";

import { LoadingBlock } from "../../structure/LoadingBlock";
import { BioDigital } from "../../atoms/BioDigital";
import { useSyncedScopeValue } from "../../../hooks/useSyncedScopeValue";
import { useAnatomies } from "../../../hooks/content/useAnatomies";
import { ErrorPlaceholder } from "../../structure/ErrorPlaceholder";

export interface IAnatomyState {
  anatomyState: {
    camera: ICameraPosition;
  };
}

const DEFAULT_ANATOMY_STATE: IAnatomyState = {
  anatomyState: { camera: null },
};

interface IAnatomyViewProps {
  anatomy: ICmsAnatomy;
  state: any;
  onStateChange: (state: IAnatomyState) => any;
}

const AnatomyViewInner: React.FC<IAnatomyViewProps> = ({
  anatomy,
  state,
  onStateChange,
}) => {
  return (
    <BioDigital
      fullScreen={true}
      onStateChange={(s) => {
        onStateChange({
          anatomyState: _.cloneDeep(s),
        });
      }}
      placeholderUrl={anatomy.placeholderImage || anatomy.posterImage}
      showInfo={false}
      {...anatomy}
      {...state}
    />
  );
};

export const AnatomyView: React.FC = ({}) => {
  const { slug } = useParams<any>();
  const { anatomies, isLoading, error, refetch } = useAnatomies();

  const activeAnatomy = useMemo(() => {
    return (anatomies || []).find((a) => a.slug === slug);
  }, [anatomies, slug]);

  const { value: anatomyState, setValue } = useSyncedScopeValue("anatomy");
  const onStateChange = (state: IAnatomyState) => {
    setValue(state.anatomyState);
  };

  return (
    <LoadingBlock isLoading={isLoading}>
      {!!activeAnatomy && (
        <AnatomyViewInner
          key={activeAnatomy?.slug}
          onStateChange={onStateChange}
          anatomy={activeAnatomy}
          state={{ ...DEFAULT_ANATOMY_STATE.anatomyState, ...anatomyState }}
        />
      )}
      {!!error && <ErrorPlaceholder retry={refetch} />}
    </LoadingBlock>
  );
};

// HACK assumes the URL structure
const isAnatomyUrl = (url: string) => url.match(/\/anatomies\/.+/);

/**
 * Clear the anatomy state when navigating away from the anatomy view
 */
export const useAutoClearScopeAnatomyState = () => {
  const history = useHistory();
  const { value: anatomyState, setValue } = useSyncedScopeValue("anatomy");

  useEffect(() => {
    if (!isAnatomyUrl(history.location.pathname)) {
      setValue(null);
    }
  }, [history.location.pathname]);
};
