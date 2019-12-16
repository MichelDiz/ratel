// Copyright 2017-2019 Dgraph Labs, Inc. and Contributors
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { executeClusterAction } from "lib/helpers";

export const GET_INSTANCE_HEALTH = "cluster/GET_INSTANCE_HEALTH";
export const GET_CLUSTER_HEALTH = "cluster/GET_CLUSTER_HEALTH";
export const GET_CLUSTER_STATE = "cluster/GET_CLUSTER_STATE";

export function getInstanceHealth() {
    return async (dispatch, getState) => {
        const { url } = getState();
        const response = await executeClusterAction(
            url.url,
            null,
            "getinstancehealth",
        );
        dispatch(getInstanceHealthCompleted(response));
    };
}

function getInstanceHealthCompleted(json) {
    return {
        type: GET_INSTANCE_HEALTH,
        json,
    };
}

export function getClusterHealth() {
    return async (dispatch, getState) => {
        const { url } = getState();
        const response = await executeClusterAction(
            url.url,
            null,
            "getclusterhealth",
        );
        dispatch(getClusterHealthCompleted(response));
    };
}

function getClusterHealthCompleted(json) {
    return {
        type: GET_CLUSTER_HEALTH,
        json,
    };
}

export function getClusterState() {
    return async (dispatch, getState) => {
        const { url } = getState();
        const response = await executeClusterAction(url.url, null, "getstate");
        dispatch(getStateCompleted(response));
    };
}

function getStateCompleted(json) {
    return {
        type: GET_CLUSTER_STATE,
        json,
    };
}
